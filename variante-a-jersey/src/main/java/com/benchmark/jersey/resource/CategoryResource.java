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

@Path("/categories")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CategoryResource {

    private final EntityManagerFactory emf;

    @Inject
    public CategoryResource(EntityManagerFactory emf) {
        this.emf = emf;
    }

    @GET
    public Response getCategories(
            @QueryParam("page") @DefaultValue("0") @Min(0) int page,
            @QueryParam("size") @DefaultValue("20") @Min(1) int size) {
        
        EntityManager em = emf.createEntityManager();
        try {
            // Count total
            Long total = em.createQuery("SELECT COUNT(c) FROM Category c", Long.class)
                    .getSingleResult();

            // Get page
            TypedQuery<Category> query = em.createQuery("SELECT c FROM Category c ORDER BY c.id", Category.class);
            query.setFirstResult(page * size);
            query.setMaxResults(size);
            List<Category> categories = query.getResultList();

            PageResponse<Category> response = new PageResponse<>(
                    categories,
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
    public Response getCategory(@PathParam("id") Long id) {
        EntityManager em = emf.createEntityManager();
        try {
            Category category = em.find(Category.class, id);
            if (category == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            return Response.ok(category).build();
        } finally {
            em.close();
        }
    }

    @GET
    @Path("/{id}/items")
    public Response getCategoryItems(
            @PathParam("id") Long id,
            @QueryParam("page") @DefaultValue("0") @Min(0) int page,
            @QueryParam("size") @DefaultValue("20") @Min(1) int size) {
        
        EntityManager em = emf.createEntityManager();
        try {
            Category category = em.find(Category.class, id);
            if (category == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            // Count total items for this category
            Long total = em.createQuery(
                    "SELECT COUNT(i) FROM Item i WHERE i.category.id = :categoryId", Long.class)
                    .setParameter("categoryId", id)
                    .getSingleResult();

            // Get paginated items with JOIN FETCH to avoid N+1
            TypedQuery<Item> query = em.createQuery(
                    "SELECT i FROM Item i JOIN FETCH i.category WHERE i.category.id = :categoryId ORDER BY i.id", 
                    Item.class);
            query.setParameter("categoryId", id);
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

    @POST
    public Response createCategory(@Valid Category category) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(category);
            em.getTransaction().commit();
            return Response.status(Response.Status.CREATED).entity(category).build();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage())).build();
        } finally {
            em.close();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateCategory(@PathParam("id") Long id, @Valid Category updatedCategory) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            Category category = em.find(Category.class, id);
            if (category == null) {
                em.getTransaction().rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            category.setCode(updatedCategory.getCode());
            category.setName(updatedCategory.getName());
            category.preUpdate();

            em.merge(category);
            em.getTransaction().commit();
            return Response.ok(category).build();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse(e.getMessage())).build();
        } finally {
            em.close();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCategory(@PathParam("id") Long id) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            Category category = em.find(Category.class, id);
            if (category == null) {
                em.getTransaction().rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            em.remove(category);
            em.getTransaction().commit();
            return Response.noContent().build();
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(new ErrorResponse(e.getMessage())).build();
        } finally {
            em.close();
        }
    }

    // Classe interne pour les erreurs
    public static class ErrorResponse {
        public String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
