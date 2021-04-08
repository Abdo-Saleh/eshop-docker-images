package com.cyran.tp.server.users;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Columns;
import javax.persistence.CascadeType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.cyran.tp.server.priviledges.Priviledges;

/**
 * Class for mapping user to DB table using Hibernate
 *
 * @author Jakub Perdek, Peter Spusta
 */
@Entity
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", unique = true, nullable = false)
    private String password;

    @ManyToOne(targetEntity = Priviledges.class)
	@JoinColumn(name="priviledges_id")
    private Priviledges role;

    /**
     * Gets id of mapped user
     *
     * @return id of mapped user
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets id of mapped user
     *
     * @param id of mapped user
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets name of mapped user
     *
     * @return name of mapped user
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name of mapped user
     *
     * @param name of mapped user
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets email of mapped user
     *
     * @return email of mapped user
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets email of mapped user
     *
     * @param email of mapped user
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets hashed for of password for mapped user
     *
     * @return password in hashed form for mapped user
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets hashed form of password for mapped user
     *
     * @param password in hash form
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets role for mapped user - role in eshop (priviledge)
     *
     * @return role in eshop for mapped user
     */
	public Priviledges getRole() {
        return this.role;
    }

    /**
     * Sets role for mapped user - role in eshop (priviledge)
     *
     * @param role in eshop for mapped user
     */
    public void setRole(Priviledges role) {
        this.role = role;
    }

}
