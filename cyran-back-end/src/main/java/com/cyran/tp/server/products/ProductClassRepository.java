package com.cyran.tp.server.products;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Class for low level requesting session for Product table in DB using Hibernate
 *
 * @author Jakub Perdek
 */
@Repository
@Transactional
public class ProductClassRepository {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Gets session for Product
     *
     * @return session for product
     */
    public Session getSession() {
        Session session = entityManager.unwrap(Session.class);
        return session;
    }

    /**
     * Gets all Users from DB
     *
     * @return list of Users
     */
    public List<Products> all() {
        Session session = getSession();
        Query query = session.createQuery("FROM products");
        return query.getResultList();
    }

    /**
     * Saves product to DB
     *
     * @param emp - instance of Product class which mapped to DB
     */
    public void save(Products emp) {
        getSession().save(emp);
    }

}