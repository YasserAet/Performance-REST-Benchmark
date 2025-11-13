package com.benchmark.jersey.resource;

import com.benchmark.jersey.dto.PageResponse;
import com.benchmark.jersey.entity.Category;
import com.benchmark.jersey.entity.Item;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.TypedQuery;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/items")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ItemResource {

    private final EntityManagerFactory emf;

    @Inject
    public ItemResource(EntityManagerFactory emf) {
        this.emf = emf;
    }

    @GET
    public Response getItems(
            @QueryParam("categoryId") Long categoryId,
            @QueryParam("page") @DefaultValue("0") @Min(0) int page,
            @QueryParam("size") @DefaultValue("20") @Min(1) int size) {

        EntityManager em = emf.createEntityManager();
        try {
            String countQuery;
            String selectQuery;

            if (categoryId != null) {
                // Filtrage par catégorie avec JOIN FETCH pour éviter N+1
                countQuery = "SELECT COUNT(i) FROM Item i WHERE i.category.id = :categoryId";
                selectQuery = "SELECT i FROM Item i JOIN FETCH i.category WHERE i.category.id = :categoryId ORDER BY i.id";
            } else {
                // Liste complète avec JOIN FETCH
                countQuery = "SELECT COUNT(i) FROM Item i";
                selectQuery = "SELECT i FROM Item i JOIN FETCH i.category ORDER BY i.id";
            }

            // Count total
            TypedQuery<Long> cq = em.createQuery(countQuery, Long.class);
            if (categoryId != null) {
                cq.setParameter("categoryId", categoryId);
            }
            Long total = cq.getSingleResult();

            // Get page
            TypedQuery<Item> query = em.createQuery(selectQuery, Item.class);
            if (categoryId != null) {
                query.setParameter("categoryId", categoryId);
            }
            query.setFirstResult(page * size);
            query.setMaxResults(size);
            List<Item> items = query.getResultList();

            PageResponse<Item> response = new PageResponse<>(
                    items,
                    page,
                    size,
                    total,
                    (int) Math.ceil((double) total / size)
            );

            return Response.ok(response).build();
        } finally {
            em.close();
        }
    }

    @GET
    @Path("/{id}")
    public Response getItem(@PathParam("id") Long id) {
        EntityManager em = emf.createEntityManager();
        try {
            // JOIN FETCH pour éviter lazy loading
            TypedQuery<Item> query = em.createQuery(
                    "SELECT i FROM Item i JOIN FETCH i.category WHERE i.id = :id", Item.class);
            query.setParameter("id", id);
            
            List<Item> results = query.getResultList();
            if (results.isEmpty()) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            
            return Response.ok(results.get(0)).build();
        } finally {
            em.close();
        }
    }

    @POST
    public Response createItem(@Valid Item item) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            
            // Vérifier que la catégorie existe
            if (item.getCategory() == null || item.getCategory().getId() == null) {
                em.getTransaction().rollback();
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(new CategoryResource.ErrorResponse("Category ID is required")).build();
            }

            Category category = em.find(Category.class, item.getCategory().getId());
            if (category == null) {
                em.getTransaction().rollback();
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(new CategoryResource.ErrorResponse("Category not found")).build();
            }

            item.setCategory(category);
            em.persist(item);
            em.getTransaction().commit();
            
            return Response.status(Response.Status.CREATED).entity(item).build();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new CategoryResource.ErrorResponse(e.getMessage())).build();
        } finally {
            em.close();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateItem(@PathParam("id") Long id, @Valid Item updatedItem) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            
            Item item = em.find(Item.class, id);
            if (item == null) {
                em.getTransaction().rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            // Vérifier et mettre à jour la catégorie si nécessaire
            if (updatedItem.getCategory() != null && updatedItem.getCategory().getId() != null) {
                Category category = em.find(Category.class, updatedItem.getCategory().getId());
                if (category == null) {
                    em.getTransaction().rollback();
                    return Response.status(Response.Status.BAD_REQUEST)
                            .entity(new CategoryResource.ErrorResponse("Category not found")).build();
                }
                item.setCategory(category);
            }

            item.setSku(updatedItem.getSku());
            item.setName(updatedItem.getName());
            item.setPrice(updatedItem.getPrice());
            item.setStock(updatedItem.getStock());
            item.preUpdate();

            em.merge(item);
            em.getTransaction().commit();
            
            return Response.ok(item).build();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new CategoryResource.ErrorResponse(e.getMessage())).build();
        } finally {
            em.close();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteItem(@PathParam("id") Long id) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            
            Item item = em.find(Item.class, id);
            if (item == null) {
                em.getTransaction().rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            
            em.remove(item);
            em.getTransaction().commit();
            
            return Response.noContent().build();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(new CategoryResource.ErrorResponse(e.getMessage())).build();
        } finally {
            em.close();
        }
    }
}
