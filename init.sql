--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.13
-- Dumped by pg_dump version 9.6.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: plv8; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plv8 WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plv8; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plv8 IS 'PL/JavaScript (v8) trusted procedural language';


--
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: cube; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- Name: dict_int; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS dict_int WITH SCHEMA public;


--
-- Name: EXTENSION dict_int; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_int IS 'text search dictionary template for integers';


--
-- Name: dict_xsyn; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS dict_xsyn WITH SCHEMA public;


--
-- Name: EXTENSION dict_xsyn; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_xsyn IS 'text search dictionary template for extended synonym processing';


--
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track execution statistics of all SQL statements executed';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgrowlocks; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgrowlocks WITH SCHEMA public;


--
-- Name: EXTENSION pgrowlocks; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgrowlocks IS 'show row-level locking information';


--
-- Name: pgstattuple; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgstattuple WITH SCHEMA public;


--
-- Name: EXTENSION pgstattuple; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgstattuple IS 'show tuple-level statistics';


--
-- Name: tablefunc; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS tablefunc WITH SCHEMA public;


--
-- Name: EXTENSION tablefunc; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION tablefunc IS 'functions that manipulate whole tables, including crosstab';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: xml2; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS xml2 WITH SCHEMA public;


--
-- Name: EXTENSION xml2; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION xml2 IS 'XPath querying and XSLT';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: priviledges; Type: TABLE; Schema: public; Owner: cvajrvwa
--

CREATE TABLE public.priviledges (
    priviledges_id integer NOT NULL,
    priviledge character varying(255) NOT NULL
);


ALTER TABLE public.priviledges OWNER TO cvajrvwa;

--
-- Name: priviledges_priviledges_id_seq; Type: SEQUENCE; Schema: public; Owner: cvajrvwa
--

CREATE SEQUENCE public.priviledges_priviledges_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.priviledges_priviledges_id_seq OWNER TO cvajrvwa;

--
-- Name: priviledges_priviledges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cvajrvwa
--

ALTER SEQUENCE public.priviledges_priviledges_id_seq OWNED BY public.priviledges.priviledges_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: cvajrvwa
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email character varying(100),
    password character varying(200),
    priviledges_id integer,
    role_id integer
);


ALTER TABLE public.users OWNER TO cvajrvwa;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: cvajrvwa
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO cvajrvwa;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cvajrvwa
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: priviledges priviledges_id; Type: DEFAULT; Schema: public; Owner: cvajrvwa
--

ALTER TABLE ONLY public.priviledges ALTER COLUMN priviledges_id SET DEFAULT nextval('public.priviledges_priviledges_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: cvajrvwa
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: priviledges; Type: TABLE DATA; Schema: public; Owner: cvajrvwa
--

COPY public.priviledges (priviledges_id, priviledge) FROM stdin;
1	admin
2	assistant
3	user
\.


--
-- Name: priviledges_priviledges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cvajrvwa
--

SELECT pg_catalog.setval('public.priviledges_priviledges_id_seq', 3, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cvajrvwa
--

COPY public.users (id, name, email, password, priviledges_id, role_id) FROM stdin;
21	ww	www	$2a$10$F/9jCRgPzrxLFbTO5nA1g.Z7czRE98wA0eSsTH2nKpBwJcJ9IlSbS	3	\N
4	fricz	fritz@fritz.sk	nonHashed	\N	\N
22	me	me	$2a$10$mLxdgRet0vRt1Dr7jAHwmOyRgXaFvSmYywZ299jQ4IFTi8S6HXf/i	2	\N
11	admin	admin@topsecret.com	nopointtobreak	1	\N
8	obito	izanagi@naruto.com	nonHashed5	\N	\N
3	jann	jan@stuba.sk	changed	3	\N
23	ddd	ddd	$2a$10$u0fbQFuw/JrIQC2Ss2IkqudWGXWn8Cp8ACAG.VFux1mZFXKrLhq02	3	\N
13	des2	des@des1.com	$2a$10$amcqV9QJRXihQJ7J0fgBZOc6PuQAaOB6TsYK3Zx3.O6z7BJ/cUbB2	\N	\N
7	ijani@firm1.com	ijani@firm.sk	nonHashed4	3	\N
14	demo1	demo	$2a$10$4rW5WTOchKzoC1.9Vu2tvu5xsH2r4/c0nJ0aftEi5Kh2WyjLSvtS2	\N	\N
15	asd	asd	$2a$10$Oy4hUElyoOkLgj3eT8wIOOn06uuye8Y4r1kk9dNh6EYXowBgpiG/C	\N	\N
6	racek1	racekjan@racekpro1.sk	nonHashed3	\N	\N
26	user	shop@assistant.gmail.com	$2a$10$aPulJD8EtzJoA6RyxS7VJ.O8j4G9.kGYlZPIl22LXPmLeIJFYV7we	2	\N
17	xperdek	xperdek@stuba.sk	$2a$10$1Agm89UIBT.ImIXeXBzXc.8kICc5XTGr9zMP6McLhV2SjltSMKr0m	3	\N
12	des	perdek.jakub@gmail.com	$2a$10$sJvkYIQ231x9ubxXeiCoo.9lrVOBQzTChgoldTpH6BC.w.HdFWaa2	1	\N
27	xxx	xxx	$2a$10$9lfN.CDORX5QDVqcKXFjKOzx4bnwnUcnytY8grNwYgVz1vLORxPt6	3	\N
28	da	da	$2a$10$FhbTrSR4kWjFBuBDlMq39uBmxaKQJWNkZ4Z52M7YuY278Sy6XwANG	3	\N
5	janko	janko1@uniba.sk	nonHashed2	\N	\N
18	d	d@d.com	$2a$10$0.Cqcxxe.zeBFrWwqcY5DeaxuzCDB3oLiTSvNW5gUWK/PrqpfQoTm	3	\N
19	w	w	$2a$10$Bnwj3AOkrxzGUzTXKR07G.olOwNzbab72wDp5vBUh/RrTk/1b1fu2	3	\N
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cvajrvwa
--

SELECT pg_catalog.setval('public.users_id_seq', 30, true);


--
-- Name: priviledges priviledges_pkey; Type: CONSTRAINT; Schema: public; Owner: cvajrvwa
--

ALTER TABLE ONLY public.priviledges
    ADD CONSTRAINT priviledges_pkey PRIMARY KEY (priviledges_id);


--
-- Name: priviledges uk_8s299577uy5cwfflsse1lnu5i; Type: CONSTRAINT; Schema: public; Owner: cvajrvwa
--

ALTER TABLE ONLY public.priviledges
    ADD CONSTRAINT uk_8s299577uy5cwfflsse1lnu5i UNIQUE (priviledge);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: cvajrvwa
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: cvajrvwa
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: cvajrvwa
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users fkbcmstgq61xlnvaeiw4ant9mvx; Type: FK CONSTRAINT; Schema: public; Owner: cvajrvwa
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fkbcmstgq61xlnvaeiw4ant9mvx FOREIGN KEY (priviledges_id) REFERENCES public.priviledges(priviledges_id);


--
-- Name: users fkqqoqd2oowy5wpopwrss9xxjq1; Type: FK CONSTRAINT; Schema: public; Owner: cvajrvwa
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fkqqoqd2oowy5wpopwrss9xxjq1 FOREIGN KEY (role_id) REFERENCES public.priviledges(priviledges_id);


--
-- PostgreSQL database dump complete
--

