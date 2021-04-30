package com.cyran.tp.server.users;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

/**
 * User repository for making query to User table
 *
 * @author Jakub Perdek
 */
public interface UsersRepository extends JpaRepository<Users, Integer>, JpaSpecificationExecutor<Users> {

    /**
     *  Selects users according name except admin - it is used for search
     *
     * @param nameU - name which identifies users
     * @return array of users obtained according name
     */
    @Query(value = ("SELECT * FROM users WHERE name LIKE (?1)  AND name != 'admin'"), nativeQuery = true)
    Users[] findByName(String nameU);

    /**
     * Selects users according email except admin - it is used for search
     *
     * @param emailU - email which identifies users
     * @return array of users obtained according email
     */
    @Query(value = ("SELECT * FROM users WHERE email LIKE :emailU  AND email != 'admin@topsecret.com'"), nativeQuery = true)
    Users[] findByEmail(@Param("emailU") String emailU);

    /**
     * Selects only one user according name except admin, otherwise it fails
     *
     * @param string - name which identifies user
     * @return user obtained according name
     */
    @Query(value = ("SELECT * FROM users WHERE name = ?1"), nativeQuery = true)
    Users getByName(String string);

    /**
     * Selects only one user according email except admin, otherwise it fails
     *
     * @param string email which identifies user
     * @return user obtained according email
     */
    @Query(value = ("SELECT * FROM users WHERE email = ?1 AND email != 'admin@topsecret.com'"), nativeQuery = true)
    Users getByEmail(String string);

    /*
     * @Query(value =
     * ("INSERT INTO users (name, email, password) VALUES ('admin', 'admin@topsecret.com', 'nopointtobreak')"),
     * nativeQuery = true) ResultSet insertAdmin();
     */

    /**
     * Changes name of user
     *
     * @param oldName - old name of user which should be changed
     * @param newName - new name which should replace old
     */
    @Query(value = ("UPDATE users SET name = ?2 WHERE name = ?1"), nativeQuery = true)
    @Modifying
    @Transactional
    void changeName(String oldName, String newName);

    /**
     * Changes email of user
     *
     * @param oldEmail - old email of user which should be changed
     * @param newEmail - new email which should replace old
     */
    @Query(value = ("UPDATE users SET email = ?2 WHERE email = ?1"), nativeQuery = true)
    @Modifying
    @Transactional
    void changeEmail(String oldEmail, String newEmail);

    /**
     * Changes password of user
     *
     * @param password - old hashed password of user which should be changed
     * @param email - new hashed password which should replace old
     */
    @Query(value = ("UPDATE users SET password = ?1 WHERE email = ?2"), nativeQuery = true)
    @Modifying
    @Transactional
    void changePassword(String password, String email);

    /**
     * Inserts new user to databse
     *
     * @param name - name of new user
     * @param email - email of new user
     * @param password - password of new user
     */
    @Query(value = ("INSERT INTO users(name, email, password) VALUES (password = ?1, email = ?2, password = ?3)"), nativeQuery = true)
    @Modifying
    @Transactional
    void insertUser(String name, String email, String password);

    /**
     * Update associted priviledge of user
     *
     * @param roleId - new role id for user
     * @param userId - user identifier for who role should be changed
     */
	@Query(value = ("UPDATE users SET priviledges_id = ?1 WHERE id = ?2"), nativeQuery = true)
    @Modifying
    @Transactional
    void updateRole(Integer roleId, Integer userId);

    /**
     * Update priviledge - role according user name
     *
     * @param roleId - role id of associated role
     * @param userName - user name which identifies user
     */
	@Query(value = ("UPDATE users SET priviledges_id = ?1 WHERE name = ?2"), nativeQuery = true)
    @Modifying
    @Transactional
    void updateRoleAccordingName(Integer roleId, String userName);

    /**
     * Gets all user
     * @return all users from database
     */
    List<Users> findAll();

}
