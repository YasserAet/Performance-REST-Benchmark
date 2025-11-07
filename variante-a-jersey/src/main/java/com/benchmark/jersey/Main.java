package com.benchmark.jersey;

import com.benchmark.jersey.resource.CategoryResource;
import com.benchmark.jersey.resource.ItemResource;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.prometheus.client.exporter.HTTPServer;
import io.prometheus.client.hotspot.DefaultExports;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.server.NetworkListener;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.URI;

public class Main {
    private static final Logger logger = LoggerFactory.getLogger(Main.class);
    private static final String BASE_URI = "http://0.0.0.0:8048/";

    public static void main(String[] args) {
        try {
            // Initialize Prometheus metrics
            DefaultExports.initialize();

            // Create EntityManagerFactory
            EntityManagerFactory emf = Persistence.createEntityManagerFactory("benchmark-pu");
            logger.info("EntityManagerFactory created");

            // Create Jersey ResourceConfig
            final ResourceConfig rc = new ResourceConfig()
                    .register(CategoryResource.class)
                    .register(ItemResource.class)
                    .register(JacksonFeature.class)
                    .register(new AbstractBinder() {
                        @Override
                        protected void configure() {
                            bind(emf).to(EntityManagerFactory.class);
                        }
                    })
                    .property(ServerProperties.BV_SEND_ERROR_IN_RESPONSE, true)
                    .property(ServerProperties.WADL_FEATURE_DISABLE, true);

            // Create HTTP server
            final HttpServer server = GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc, false);

            // Start Prometheus metrics server on separate port
            HTTPServer metricsServer = new HTTPServer(new InetSocketAddress(9091).getPort(), true);

            // Start server
            server.start();

            logger.info("========================================");
            logger.info("Variante A - Jersey + JPA démarrée");
            logger.info("URL: {}", BASE_URI);
            logger.info("Metrics: http://localhost:9091/metrics");
            logger.info("Appuyez sur Ctrl+C pour arrêter");
            logger.info("========================================");

            // Graceful shutdown
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                logger.info("Arrêt du serveur...");
                server.shutdownNow();
                metricsServer.close();
                emf.close();
                logger.info("Serveur arrêté");
            }));

            Thread.currentThread().join();

        } catch (Exception e) {
            logger.error("Erreur au démarrage", e);
            System.exit(1);
        }
    }
}
