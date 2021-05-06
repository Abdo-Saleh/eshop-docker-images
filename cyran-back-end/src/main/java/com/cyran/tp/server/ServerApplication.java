package com.cyran.tp.server;

import com.cyran.tp.server.priviledges.Priviledges;
import com.cyran.tp.server.priviledges.PriviledgesRepository;
import com.cyran.tp.server.users.Users;
import com.cyran.tp.server.users.UsersRepository;
import com.cyran.tp.server.products.Products;
import com.cyran.tp.server.products.ProductsRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Example;

/**
 * Main point when spring starts
 *
 * @author Peter Spusta
 */
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ServerApplication {

    @Autowired
    private PriviledgesRepository priviledgesRepository;

    @Autowired
    private UsersRepository usersRepository;

	@Autowired
    private ProductsRepository productsRepository;
	
    // TODO: use spring.datasource.data property and reference sequence values manually
    @Bean
    InitializingBean createUserTypes() {
        return () -> {
			try {
				Priviledges admin = new Priviledges();
				Priviledges assistant = new Priviledges();
				Priviledges user = new Priviledges();
				user.setPriviledge("user");
				assistant.setPriviledge("assistant");
				admin.setPriviledge("admin");
				if(!priviledgesRepository.exists(Example.of(user))){
					priviledgesRepository.save(user);
				}
				if(!priviledgesRepository.exists(Example.of(assistant))){
					priviledgesRepository.save(assistant);
				}
				if(!priviledgesRepository.exists(Example.of(admin))){
					priviledgesRepository.save(admin);
				}
				Users user1 = new Users();
				user1.setRole(priviledgesRepository.findPriviledgeByName("user"));
				user1.setName("Jan");
				user1.setEmail("jan@stuba.sk");
				user1.setPassword("nonHashed1");
				if(!usersRepository.exists(Example.of(user1))){
					usersRepository.save(user1);
				}
				Users assistant1 = new Users();
				assistant1.setRole(priviledgesRepository.findPriviledgeByName("assistant"));
				assistant1.setName("user");
				assistant1.setEmail("user@user.sk");
				assistant1.setPassword("$2a$10$vZZB6gMeXs2O6WCLUAw.BOskBXdlqPa0F.1e7fzYxksofswQCcOSa");
				if(!usersRepository.exists(Example.of(assistant1))){
					usersRepository.save(assistant1);
				}
				Users admin1 = new Users();
				admin1.setRole(priviledgesRepository.findPriviledgeByName("admin"));
				admin1.setName("admin");
				admin1.setEmail("admin@topsecret.com");
				admin1.setPassword("nopointtobreak");
				if(!usersRepository.exists(Example.of(admin1))){
					usersRepository.save(admin1);
				}
			} catch(Exception e){
				System.out.println("Cannot innitialize DB! DB is probably initialized. Please delete its content for new start of a game!");
			}
        };
    }

	public void insertProduct(String name, String description, Double price, String url, Long amount) throws Exception {
		Products product = new Products();
		product.setName(name);
		product.setDescription(description);
		product.setUrl(url);
		product.setPrice(price);
		if(!productsRepository.exists(Example.of(product))){
			productsRepository.save(product);
		}
	}
	
	@Bean
    InitializingBean initProducts() {
        return () -> {
			try {
				insertProduct("Originálna hádanka", "Pôvodná hádanka. Zistíte, kto kde býva, čo fajčí, pije a o aké zviera sa stará? A kto z nich chová rybičky?", 1.51, "http://localhost:4200/assets/einstein/004.jpg", 1000000L);
				insertProduct("Kamarátky", "Pohromade je päť kamarátok. Každá má rada niektorého herca, počúva iný štýl hudby, má iné koníčky a aj sa inak stravuje. Ktorej chutia ovsené vločky?", 1.45, "http://localhost:4200/assets/einstein/005.jpg", 1000000L);
				insertProduct("Susedia", "Päť susedov. Kto z nich najradšej cestuje trolejbusom? Každý má meno, prezývku, operačný systém, hobby a rád chodí iným dopravným prostriedkom.", 2.50, "http://localhost:4200/assets/einstein/006.jpg", 1000000L);
				insertProduct("Zastávka", "Na zastávke stojí 5 rôznych ľudí. Kto z nich má hokejový dres? Každý má iný názor na hudbu, dovolenku, niečo iné si vypije a taktiež má niečo iné oblečené.", 1.70, "http://localhost:4200/assets/einstein/007.jpg", 1000000L);
				insertProduct("Autá", "Vedľa seba je zaparkovaných 5 áut. Každé má iného majiteľa, farbu, poznávaciu značku a pneumatiky. Kto jazdieva na zelenom aute?", 0.50, "http://localhost:4200/assets/einstein/008.jpg", 1000000L);
				insertProduct("Notebooky", "Na stole je 5 notebookov s rôznymi značkami, veľkosťami disku, farbami, kancelárskymi balíkmi a operačnými systémami. Ktorý z nich je značky Samsung?", 0.94, "http://localhost:4200/assets/einstein/009.jpg", 1000000L);
				insertProduct("Planéty", "Vedľa seba je päť odlišných planét. Každá má iné pomenovanie, inú atmosféru, politické zriadenie, veľkosť a taktiež má každá z nich mesiace. Na ktorej planéte je feudalizmus?", 1.54, "http://localhost:4200/assets/einstein/010.jpg", 1000000L);
				insertProduct("Knihožrúti", "Skupina čitateľov, ktorí majú radi knihy rôznych žánrov a od rôznych autorov. Taktiež každý preferuje inú väzbu a iné miesto na čítanie. Kto z nich si rád prečíta dobré fantasy?", 1.20, "http://localhost:4200/assets/einstein/011.jpg", 1000000L);
				insertProduct("Šachisti", "Šach je hra bohatá. V tomto príklade je 5 šachistov, pričom každý rád hráva iný šachový variant, inú hru. K tomu obľúbená figúra, spôsob výhry a obľúbený čas na partiu. Kto obľubuje taliansku hru?", 1.42, "http://localhost:4200/assets/einstein/012.jpg", 1000000L);
				insertProduct("Ostrovy", "Ostrovy patriace rôznym krajinám, ktoré majú svoje zaujímavosti, vegetáciu a možnosti ubytovania. Ktorý má akých návštevníkov a na ktorom ostrove sú palmy?", 1.29, "http://localhost:4200/assets/einstein/013.jpg", 1000000L);
				insertProduct("Chalani", "5 chalanov s rôznymi menami, obľúbenými športami, do toho rôzne zlozvyky, počítačové hry a niečo z toho, čo si radi pozrú v televízii. Kto z nich má zlozvyk klamať?", 0.95, "http://localhost:4200/assets/einstein/014.jpg", 1000000L);
				insertProduct("Blogeri", "Na tému odvody bloguje niekto z blogerov. Kto? Dohromady je vedľa seba 5 blogerov a každý z nich má inú prezývku, obľúbenú tému, redakčný systém a návštevnosť na blogu.", 1.65, "http://localhost:4200/assets/einstein/015.jpg", 1000000L);
				insertProduct("Umelkyne",  "Kresliť, maľovať alebo inak vytvárať umelecké diela sa dá rôznymi spôsobmi. Ktorá z umelkýň najradšej používa uhlík? 5 umelkýň, pričom každá rada pracuje s iným nástrojom, kreslí niečo iné, pochádza z iného mesta a taktiež má rôzny vek.", 2.25, "http://localhost:4200/assets/einstein/016.jpg", 1000000L);
				insertProduct("Rozprávkové bytosti", "Rozprávky, rozpávkové bytosti, kúzla a moc, to všetko je možné nájsť v knihách, filmoch či hrách. Vedľa seba stoja rozličné postavy. Dokážete ich správne identifikovať? A kto je zo Sunvelie?", 1.38, "http://localhost:4200/assets/einstein/017.jpg", 1000000L);
				insertProduct("Zberatelia", "Zberatelia dokážu zbierať niekedy naozaj čokoľvek. V tejto hádanke je vedľa seba niekoľko z nich. Každý z nich rád zbiera hokejové kartičky, autíčka, poštové známky a mince. Kto zbiera hokejové kartičky San Jose Sharks?", 0.74, "http://localhost:4200/assets/einstein/018.jpg", 1000000L);
				insertProduct("Vane", "Aj také na prvý pohľad bežné veci, ako sú vane, môžu byť veľmi rôznorodé. Ktorá je aká? Ktorá má akú šírku? Z čoho sa ktorá vyrobila? A v ktorom štáte? A ako sú zafarbené? A ktorá z nich je modrá?", 1.85, "http://localhost:4200/assets/einstein/019.jpg", 1000000L);
				insertProduct("Učitelia", "Spoznajte lepšie päticu učiteľov. Každý z nich učí niektorý predmet a okrem toho aj cudzí jazyk. Okrem odlišných mien a vekov majú aj iný pohľad na voľnočasové aktivity. Kto sa čomu venuje?", 0.91, "http://localhost:4200/assets/einstein/020.jpg", 1000000L);
				insertProduct("Alkoholici", "Alkohol je ťažký súper, na tom sa zhodnú všetky ústavy vytvorené na liečbu tejto závislosti. V hádanke je 5 alkoholikov. Každý z nich má rád konkrétnu krajinu pôvodu u vína, značku piva, neodolá niektorému silnejšiemu alkoholu a nejakým spôsobom sa z krčmy každý z nich dostane, až na jednu výnimku. Kto z krčmy vôbec neodchádza?", 0.32, "http://localhost:4200/assets/einstein/021.jpg", 1000000L);
			} catch(Exception e){
				System.out.println("Cannot innitialize DB! DB is probably initialized. Please delete its content for new start of a game!");
			}
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

}
