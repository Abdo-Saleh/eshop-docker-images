package com.cyran.tp.server.users;

import javax.persistence.Column;

/**
 * Class for User representation
 *
 * @author Jakub Perdek, Peter Spusta
 */
public class UsersDTO {

    private Integer id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    private String password;
	
	private String priviledges;

    /**
     * Creates instance with name and email of user
     *
     * @param name - name from user instance
     * @param email - email from user instance
     */
    public UsersDTO(String name, String email) {
        this.name = name;
        this.email = email;
    }

    /**
     * Creates empty user instance
     */
    public UsersDTO() {
    }

    /**
     * Sets id from user instance
     *
     * @param id - id from user
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets id from user instance
     *
     * @return id from user instance
     */
    public Integer getId() {
        return this.id;
    }

    /**
     * Gets name from user instance
     *
     * @return name from user instance
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name from user instance
     *
     * @param name from user instance
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets email from user instance
     *
     * @return email from user instance
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets email from user instance
     *
     * @param email from user instance
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets hashed password from user instance
     *
     * @return hashed password from user instance
     */
    public String getPassword() {
        return this.password;
    }

    /**
     * Sets hashed password from user instance
     *
     * @param password - hashed password from user instance
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets user priviledge from instance - eshop role
     *
     * @return user priviledge - role in eshop
     */
	public String getPriviledges(){
		return this.priviledges;
	}

    /**
     * Sets user priviledge - eshop role
     *
     * @param priviledges - priviledge of user as role in eshop
     */
	public void setPriviledges(String priviledges){
		this.priviledges = priviledges;
	}
}
