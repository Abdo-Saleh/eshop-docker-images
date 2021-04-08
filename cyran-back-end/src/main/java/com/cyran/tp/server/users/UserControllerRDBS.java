package com.cyran.tp.server.users;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.MediaType;

import javassist.NotFoundException;
import java.util.List;

import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

import org.hibernate.HibernateException;
import org.hibernate.Transaction;
import org.hibernate.SQLQuery;
import org.hibernate.Criteria;

import javax.mail.internet.AddressException;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;
import javax.mail.Multipart;
import javax.mail.internet.MimeMessage;
import javax.mail.PasswordAuthentication;
import java.io.IOException;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.Transport;
import javax.mail.Message;
import java.util.Date;
import java.util.Properties;
import javax.mail.Session;

import com.cyran.tp.server.priviledges.PriviledgesController;
import com.cyran.tp.server.priviledges.PriviledgesRepository;
import com.cyran.tp.server.priviledges.Priviledges;

/**
 * Managing user and storing information about him
 *
 * @author Jakub Perdek, Peter Spusta
 */
@RestController
public class UserControllerRDBS {

    @Autowired
    private UserClassRepository userClassRepository;

    @Autowired
    private UsersRepository usersRepository;

	@Autowired
    private PriviledgesRepository priviledgesRepository;

    /**
     * Method for registering user
     *
     * @param request - request for registration
     * @param body - body of post request with email, name and hashed form of password
     * @param response - response which should be send back
     * @return string that confirms of user registration, otherwise denial of it
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     * @throws HibernateException
     */
    @RequestMapping(path = "/signup", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
    public String register(HttpServletRequest request, @RequestBody String body, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException, ParseException,
            HibernateException {

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String name = (String) obj.get("name");
        String email = (String) obj.get("email");
        String password = (String) obj.get("password");

        Users newUser = new Users();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(password);
        usersRepository.save(newUser);

        return "User successfully created";

    }

    /**
     * Method for logging of user
     *
     * @param request - request for login
     * @param name - name of user which should be obtained from DB
     * @param response - response for login
     * @return information about user when he logs in
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     * @throws HibernateException
     */
    @RequestMapping(path = "/login", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
    public UsersDTO login(HttpServletRequest request, @RequestParam String name, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException, ParseException,
            HibernateException {

        Users user = usersRepository.getByName(name);
		String priviledge;
		Priviledges role = user.getRole();
		if(role == null){
			Integer hodnota = PriviledgesController.getUserPriviledgeIdAccrodingPriviledgeName("user", priviledgesRepository);
			usersRepository.updateRole(hodnota, user.getId());
			priviledge = "user";
		} else {
	
			priviledge = role.getPriviledge();
		}
		
        return UsersUtils.userToDtoMapping(user, priviledge);
    }

    /**
     * Sets role to user (role should be already inserted in DB)
     *
     * @param request - request for setting role
     * @param body - body contains name of user, his new role + password
     * @param response - request for setting role
     * @return
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     * @throws HibernateException
     */
	@RequestMapping(path = "/setRole", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
    public String setRole(HttpServletRequest request, @RequestBody String body, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException, ParseException,
            HibernateException {

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String name = (String) obj.get("name");
        String role = (String) obj.get("role");
        String password = (String) obj.get("password");
	
		if(password == ""){
			return "wrong password";
		}
		
		Integer value = PriviledgesController.getUserPriviledgeIdAccrodingPriviledgeName(role, priviledgesRepository);
		if(value == 0) {
			return "Unknown role: "+ role;
		}
		usersRepository.updateRoleAccordingName(value, name);

        return "Role successfully set!";
    }

    /**
     *  Gets certain role according user name
     *
     * @param request - request for getting role
     * @param body - contains name of user for which should be role observed + password
     * @param response - response for getting role
     * @return
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     * @throws HibernateException
     */
	@RequestMapping(path = "/getRole", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
    public String getRole(HttpServletRequest request, @RequestBody String body, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException, ParseException,
            HibernateException {

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String name = (String) obj.get("name");
        String password = (String) obj.get("password");
	
		if(password == ""){
			return "wrong password";
		}
		
		Users user = usersRepository.getByName(name);
		if(user == null) { return "Unknown user!"; }
		
		String priviledge;
		Priviledges role = user.getRole();
		if(role == null){
			Integer hodnota = PriviledgesController.getUserPriviledgeIdAccrodingPriviledgeName("user", priviledgesRepository);
			usersRepository.updateRole(hodnota, user.getId());
			return "user";
		} 
			
		return role.getPriviledge();
    }

    /**
     * Search for users according name (text is included in some name)
     *
     * @param request - request for searching for user according name
     * @param body - contains name of user or part of it
     * @param response - response for searching for user according name
     * @return array of users with part of given name
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     * @throws HibernateException
     */
    @RequestMapping(path = "/name", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
    public UsersDTO[] searchForName(HttpServletRequest request, @RequestBody String body, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException, ParseException,
            HibernateException {

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String name = (String) obj.get("name");
        boolean vulnerable = true;
        if (vulnerable) {
            SQLQuery query = userClassRepository.getSession()
                    .createSQLQuery("SELECT * FROM users WHERE name LIKE '%" + name + "%'  AND name != 'admin'");
            query.addEntity(Users.class);
            List<Users> prodList = query.list();

            return UsersUtils.userToDtoMapping(prodList);
        } else {
            return UsersUtils.userToDtoMapping(usersRepository.findByName("%" + name + "%"));
        }

    }

    /**
     * Search for users according email (text is included in some email)
     *
     * @param request - request for searching for user according email
     * @param body - contains email of user or part of it
     * @param response - response for searching for user according email
     * @return array of users with part of given email
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     */
    @RequestMapping(path = "/email", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin
    public UsersDTO[] searchForEmail(HttpServletRequest request, @RequestBody String body, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException, ParseException {

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String email = (String) obj.get("email");

        boolean vulnerable = true;
        if (vulnerable) {
            SQLQuery query = userClassRepository.getSession().createSQLQuery(
                    "SELECT * FROM users WHERE email LIKE '%" + email + "%' AND email != 'admin@topsecret.com'");
            query.addEntity(Users.class);
            List<Users> prodList = query.list();

            return UsersUtils.userToDtoMapping(prodList);
        } else {
            return UsersUtils.userToDtoMapping(usersRepository.findByEmail("%" + email + "%"));
        }
    }

    /**
     * Returns all users
     *
     * @param request - request for getting all users
     * @param response - response with all users
     * @return all users from DB
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     */
    @RequestMapping(path = "/all", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public List<Users> getAll(HttpServletRequest request, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException {
        return usersRepository.findAll();
    }

    /**
     * Inserts admin to DB
     *
     * @param request - request for admin insertion
     * @param response - response for admin insertion
     * @return confirmation string if admin is inserted, otherwise null
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     */
    @RequestMapping(path = "/insertAdmin", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public String insertAdmin(HttpServletRequest request, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException {
        if (false) {
            Users admin = new Users();
            admin.setName("admin");
            admin.setEmail("admin@topsecret.com");
            admin.setPassword("nopointtobreak");
            usersRepository.save(admin);
            return "Admin succesfully created";
        }
        return null;
    }

    /**
     * Changes email according old email
     *
     * @param request - request for changing email according old email
     * @param body - body containing old and new email + password should be included
     * @param response - response for changing email according old email
     * @return true if email is changed otherwise not
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     */
    @RequestMapping(path = "/changeEmail", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public boolean changeEmail(HttpServletRequest request, @RequestBody String body, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException, ParseException {

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String oldEmail = (String) obj.get("oldEmail");
        String newEmail = (String) obj.get("newEmail");

        boolean vulnerable = true;
        if (vulnerable) {
            usersRepository.changeEmail(oldEmail, newEmail);
            return true;
        } else {

            Users user = usersRepository.getByEmail(oldEmail);

            if (user != null) {
                user.setEmail(newEmail);
                usersRepository.save(user);

                return true;
            }
        }
        return false;
    }

    /**
     * Changes name of user in DB according old name
     *
     * @param request - request for changing name of user according old name
     * @param body - body containing name and new name + password should be included
     * @param response - response for changing name according old name
     * @return true if name of user is changed otherwise not
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     */
    @RequestMapping(path = "/changeName", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public boolean changeName(HttpServletRequest request, @RequestBody String body, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException, ParseException {

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String oldName = (String) obj.get("oldName");
        String newName = (String) obj.get("newName");

        boolean vulnerable = true;
        if (vulnerable) {
            usersRepository.changeName(oldName, newName);

        } else {

            Users user = usersRepository.getByName(oldName);

            if (user != null) {
                user.setName(newName);
                usersRepository.save(user);
                return true;
            }
        }
        return false;
    }

    /**
     * Changes password of user according email
     *
     * @param request - request for changing password of user according email
     * @param body - body containing pure for of changed password and hashed changed password + password should be included
     * @param response - response for changing password of user according email
     * @return true if password is changed otherwise false
     * @throws NotFoundException
     * @throws IllegalArgumentException
     * @throws IllegalAccessException
     * @throws ParseException
     * @throws AddressException
     * @throws MessagingException
     * @throws IOException
     */
    @RequestMapping(path = "/changePasswd", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public boolean changePassword(HttpServletRequest request, @RequestBody String body, HttpServletResponse response)
            throws NotFoundException, IllegalArgumentException, IllegalAccessException, ParseException,
            AddressException, MessagingException, IOException {

        JSONParser parser = new JSONParser();
        JSONObject obj = (JSONObject) parser.parse(body);
        String email = (String) obj.get("email");
        String purePassword = (String) obj.get("purePassword");
        String hashedPassword = (String) obj.get("hashedPassword");

        boolean vulnerable = false;
        if (vulnerable) {
            usersRepository.changeName(hashedPassword, email);
            // purePassword should be send to User email
            sendmail(email, purePassword);

        } else {
            Users user = usersRepository.getByEmail(email);

            if (user != null) {
                user.setPassword(hashedPassword);
                usersRepository.save(user);

                // purePassword should be send to User email
                sendmail(email, purePassword);

                return true;
            }
        }
        return false;
    }

    /**
     * Sends email with generated password to user
     *
     * @param email - destination, user email where password should be send
     * @param purePassword - pure password which should be added to email
     * @throws AddressException
     * @throws MessagingException
     * @throws IOException
     */
    private void sendmail(String email, String purePassword) throws AddressException, MessagingException, IOException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("tutorialeshop@gmail.com", "tutorial123456");
            }
        });
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("tutorialeshop@gmail.com", false));

        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
        msg.setSubject("Passsword change in security eshop");
        msg.setContent("Passsword change in security eshop", "text/html");
        msg.setSentDate(new Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent("Your new password is: " + purePassword, "text/html");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);
        // MimeBodyPart attachPart = new MimeBodyPart();

        // attachPart.attachFile("/var/tmp/image19.png");
        // multipart.addBodyPart(attachPart);
        msg.setContent(multipart);
        Transport.send(msg);
    }
}
