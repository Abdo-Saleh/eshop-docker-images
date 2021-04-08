package com.cyran.tp.server.users;

import java.util.List;
import java.util.Iterator;

/**
 * Utils for managing user instances
 *
 * @author Jakub Perdek, Peter Spusta
 */
public class UsersUtils {

    /**
     * Creates UserDTO instances from User instances
     *
     * @param users - array of user instances
     * @return array of UsersDTO instances created from User instances
     */
    public static UsersDTO[] userToDtoMapping(Users[] users) {
        UsersDTO udto[] = new UsersDTO[users.length];

        for (int i = 0; i < users.length; i++) {
            udto[i] = new UsersDTO();
            if (users[i] != null) {
                udto[i].setId(users[i].getId());
                udto[i].setName(users[i].getName());
                udto[i].setEmail(users[i].getEmail());
            }
        }
        return udto;
    }

    /**
     * Creates UserDTO instances from User instances
     *
     * @param users - list of user instances
     * @return array of UsersDTO instances created from User instances
     */
    public static UsersDTO[] userToDtoMapping(List<Users> users) {
        UsersDTO udto[] = new UsersDTO[users.size()];
        Iterator<Users> iterator = users.iterator();
        Users user;
        int i = 0;

        while (iterator.hasNext()) {
            user = iterator.next();

            udto[i] = new UsersDTO();
            if (user != null) {
                udto[i].setId(user.getId());
                udto[i].setName(user.getName());
                udto[i].setEmail(user.getEmail());
                i++;
            }
        }
        return udto;
    }

    /**
     * Creates UserDTO instances from User instances
     *
     * @param users - user instance
     * @return UsersDTO instance created from User instance
     */
    public static UsersDTO userToDtoMapping(Users users) {
        UsersDTO udto = new UsersDTO();
        if (users != null) {
            udto.setId(users.getId());
            udto.setName(users.getName());
            udto.setEmail(users.getEmail());
            udto.setPassword(users.getPassword());
        }
        return udto;
    }

    /**
     * Creates UserDTO instances from User instances
     *
     * @param users - user instance
     * @param priviledges - priviledge which should be add in case of mapping
     * @return UsersDTO instance created from User instance
     */
	public static UsersDTO userToDtoMapping(Users users, String priviledges) {
        UsersDTO udto = new UsersDTO();
        if (users != null) {
            udto.setId(users.getId());
            udto.setName(users.getName());
            udto.setEmail(users.getEmail());
            udto.setPassword(users.getPassword());
			udto.setPriviledges(priviledges);
        }
        return udto;
    }

    /**
     * Removes password from user
     *
     * @param users - modified instance of user
     * @return modified instance of user (reference to user)
     */
    public static Users removePassFromUsers(Users users) {
        users.setPassword("");
        return users;
    }
}
