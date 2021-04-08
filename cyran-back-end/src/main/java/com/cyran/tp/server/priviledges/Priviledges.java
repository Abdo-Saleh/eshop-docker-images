package com.cyran.tp.server.priviledges;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Columns;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;

import java.util.Set;
import java.util.HashSet;
import java.util.List;

import com.cyran.tp.server.users.Users;

/**
 * Class for priviledges
 *
 * @author Jakub Perdek
 */
@Entity
@Table(name = "priviledges")
public class Priviledges {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "priviledges_id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "priviledge", unique = true, nullable = false)
    private String priviledge;

    /**
     * Returns id of priviledge
     *
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets id of priviledge
     *
     * @param id - new id of priviledge
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Returns priviledge string
     *
     * @return priviledge - role in eshop
     */
    public String getPriviledge() {
        return priviledge;
    }

    /**
     * Sets priviledge string - role
     *
     * @param priviledge - role in eshop
     */
    public void setPriviledge(String priviledge) {
        this.priviledge = priviledge;
    }

}
