package com.cyran.tp.server.users;

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
 * Class for low level requesting session for User table in DB using Hibernate
 *
 * @author Jakub Perdek
 */
@Repository
@Transactional
public class UserClassRepository {

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Gets session for User
     *
     * @return session for user
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
    public List<Users> all() {
        Session session = getSession();
        Query query = session.createQuery("FROM users");
        return query.getResultList();
    }

    /**
     * Saves user to DB
     *
     * @param emp - nstance of User class which mapped to DB
     */
    public void save(Users emp) {
        getSession().save(emp);
    }

}