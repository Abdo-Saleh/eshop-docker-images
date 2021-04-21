CREATE TABLE IF NOT EXISTS vuln_types (
	id SERIAL NOT NULL PRIMARY KEY,
	vuln_type TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS vuln_danger (
	id SERIAL NOT NULL PRIMARY KEY,
	vuln_danger TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS vulnerabilities (
	id SERIAL NOT NULL PRIMARY KEY,
	vuln_type_id INT NOT NULL,
	description TEXT,
	vuln_danger_id INT NOT NULL,
	reference_record_id BIGINT NOT NULL
);

INSERT INTO vuln_types(vuln_type) VALUES ('SQL injection'), ('Week passwords'), 
('XSS'), ('Sensitive data exposure'), ('Insufficient logging and monitoring'), ('Broken access control')
ON CONFLICT DO NOTHING;

INSERT INTO vuln_danger(vuln_danger) VALUES ('LOW'), ('MODERATE'), ('HIGHT'), ('EXTREME') ON CONFLICT DO NOTHING;

INSERT INTO whois (domain_name, query_time, create_date, update_date, expiry_date, domain_registrar_id, domain_registrar_name, domain_registrar_whois, domain_registrar_url, registrant_name, registrant_company, registrant_address, registrant_city, registrant_state, registrant_zip, registrant_country, registrant_email, registrant_phone, registrant_fax, administrative_name, administrative_company, administrative_address, administrative_city, administrative_state, administrative_zip, administrative_country, administrative_email, administrative_phone, administrative_fax, technical_name, technical_company, technical_address, technical_city, technical_state, technical_zip, technical_country, technical_email, technical_phone, technical_fax, billing_name, billing_company, billing_address, billing_city, billing_state, billing_zip, billing_country, billing_email, billing_phone, billing_fax, name_server_1, name_server_2, name_server_3, name_server_4, domain_status_1, domain_status_2, domain_status_3, domain_status_4) VALUES
 ( 'localhost:4200', '2019-03-25 12:40:08', '2020-03-20', '2020-04-23', '2022-03-23', '1171', 'Deschutesdomains.com LLC', 'whois.deschutesdomains.com', 'http://www.networksolutions.com', 'Igor', '', '', 'Secure', 'Boo', '414000', 'Slovakia', '', '', '', 'Igor', '', '', 'Secure', 'Boo', '414000', 'Slovakia', '', '', '', 'Igor', '', '', 'Secure', 'Boo', '414000', 'Slovakia', '', '', '', '', '', '', '', '', '', '', '', '', '', 'v1.juming-xz.com', 'v1.xz-juming.com', '', '', '', '', '', '') ON CONFLICT DO NOTHING;
 
INSERT INTO vulnerabilities (vuln_type_id, description, vuln_danger_id, reference_record_id) 
(
SELECT vuln_type_id, 'Users email with nick user can be identified from response!', vuln_danger_id, reference_record_id FROM 
(SELECT id AS vuln_type_id FROM vuln_types WHERE vuln_type = 'Sensitive data exposure') vuln_type_id, 
(SELECT id AS vuln_danger_id FROM vuln_danger WHERE vuln_danger = 'MODERATE') vuln_danger_id,
(SELECT id AS reference_record_id FROM whois WHERE domain_name = 'localhost:4200') reference_record_id
);