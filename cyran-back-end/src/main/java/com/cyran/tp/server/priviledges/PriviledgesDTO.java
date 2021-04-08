package com.cyran.tp.server.priviledges;

import javax.persistence.Column;

/**
 * Class for mapping priviledges
 *
 * @author Jakub Perdek
 */
public class PriviledgesDTO {

    private Integer id;

    @Column(name = "priviledges", unique = true, nullable = false)
    private String priviledges;

    /**
     * Creates instance of Priviledge with name
     *
     * @param priviledges - name of priviledge - role in eshop
     */
    public PriviledgesDTO(String priviledges) {
        this.priviledges = priviledges;
    }

    /**
     * Creates instance of Priviledge
     */
    public PriviledgesDTO() {
    }

    /**
     * Sets id of Priviledge instance
     *
     * @param id - new id of priviledge
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets id of Priviledge instance
     *
     * @return id of priviledge instance
     */
    public Integer getId() {
        return this.id;
    }

    /**
     * Gets priviledge string of Priviledge instance - role in eshop
     *
     * @return priviledge string - role in eshop
     */
    public String getPriviledges() {
        return priviledges;
    }

    /**
     * Sets priviledge string of Priviledge instance - role in eshop
     *
     * @param priviledges - priviledge string - role in eshop
     */
    public void setPriviledges(String priviledges) {
        this.priviledges = priviledges;
    }

}
