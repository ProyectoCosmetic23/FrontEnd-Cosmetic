--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id_client integer NOT NULL,
    nit_or_id_client character varying(10),
    name_client character varying(100) NOT NULL,
    last_name_client character varying(100),
    email_client character varying(100) NOT NULL,
    phone_client character varying(20) NOT NULL,
    address_client character varying(100) NOT NULL,
    state_client character varying(15) NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: clients_id_client_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.clients ALTER COLUMN id_client ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.clients_id_client_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: commission_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commission_detail (
    id_commission_detail integer NOT NULL,
    month_commission timestamp without time zone,
    commission_percentage integer NOT NULL
);


ALTER TABLE public.commission_detail OWNER TO postgres;

--
-- Name: commission_detail_id_commission_detail_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.commission_detail ALTER COLUMN id_commission_detail ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.commission_detail_id_commission_detail_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: commissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commissions (
    id_commission integer NOT NULL,
    id_employee integer NOT NULL,
    total_commission numeric NOT NULL,
    id_commission_detail integer NOT NULL,
    total_sales integer NOT NULL
);


ALTER TABLE public.commissions OWNER TO postgres;

--
-- Name: commissions_id_commission_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.commissions ALTER COLUMN id_commission ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.commissions_id_commission_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: defective_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.defective_products (
    id_defective_product integer NOT NULL,
    id_product integer NOT NULL,
    return_reason character varying(100),
    return_date timestamp without time zone,
    return_quantity integer NOT NULL,
    return_value numeric NOT NULL
);


ALTER TABLE public.defective_products OWNER TO postgres;

--
-- Name: defective_products_id_defective_product_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.defective_products ALTER COLUMN id_defective_product ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.defective_products_id_defective_product_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id_employee integer NOT NULL,
    id_card_employee character varying(10),
    name_employee character varying(80) NOT NULL,
    email character varying(80) NOT NULL,
    address character varying(80) NOT NULL,
    phone character varying(80) NOT NULL,
    state_employee character varying(15),
    observation character varying(100),
    creation_date_employee timestamp without time zone
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_id_employee_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.employees ALTER COLUMN id_employee ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employees_id_employee_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: order_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_detail (
    id_order_detail integer NOT NULL,
    id_order integer NOT NULL,
    id_product integer NOT NULL,
    product_quantity integer NOT NULL,
    product_price numeric NOT NULL
);


ALTER TABLE public.order_detail OWNER TO postgres;

--
-- Name: order_detail_id_order_detail_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.order_detail ALTER COLUMN id_order_detail ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_detail_id_order_detail_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id_order integer NOT NULL,
    id_client integer NOT NULL,
    id_employee integer NOT NULL,
    order_number integer NOT NULL,
    order_date timestamp without time zone NOT NULL,
    payment_type character varying(100) NOT NULL,
    order_state character varying(15),
    delivery_state character varying(15),
    payment_state character varying(15),
    total_order numeric
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_order_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orders ALTER COLUMN id_order ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_id_order_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id_payment integer NOT NULL,
    id_sale integer NOT NULL,
    id_client integer NOT NULL,
    payment_date timestamp without time zone NOT NULL,
    total_payment numeric NOT NULL,
    total_remaining numeric NOT NULL
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_payment_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.payments ALTER COLUMN id_payment ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.payments_id_payment_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: product_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_categories (
    id_category integer NOT NULL,
    name_category character varying(100),
    state_category character varying(15),
    observation_category character varying(100),
    creation_date_category timestamp without time zone
);


ALTER TABLE public.product_categories OWNER TO postgres;

--
-- Name: product_categories_id_category_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.product_categories ALTER COLUMN id_category ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_categories_id_category_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id_product integer NOT NULL,
    id_category integer NOT NULL,
    name_product character varying(80) NOT NULL,
    quantity integer NOT NULL,
    max_stock integer NOT NULL,
    min_stock integer NOT NULL,
    cost_price numeric NOT NULL,
    selling_price numeric NOT NULL,
    profit numeric NOT NULL,
    creation_date_product timestamp without time zone,
    state_product character varying(15),
    observation character varying(100)
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_product_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products ALTER COLUMN id_product ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_product_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: providers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.providers (
    id_provider integer NOT NULL,
    nit_cedula character varying(10),
    name_provider character varying(100) NOT NULL,
    email_provider character varying(100) NOT NULL,
    address_provider character varying(100) NOT NULL,
    phone_provider character varying(25) NOT NULL,
    state_provider character varying(15),
    observation_provider character varying(100),
    name_contact character varying(100) NOT NULL,
    creation_date_provider timestamp without time zone
);


ALTER TABLE public.providers OWNER TO postgres;

--
-- Name: providers_id_provider_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.providers ALTER COLUMN id_provider ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.providers_id_provider_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: purchase_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchase_detail (
    id_purchase_detail integer NOT NULL,
    id_purchase integer NOT NULL,
    id_product integer NOT NULL,
    product_category character varying(100),
    product_quantity integer NOT NULL,
    cost_price numeric,
    selling_price numeric,
    sub_total numeric
);


ALTER TABLE public.purchase_detail OWNER TO postgres;

--
-- Name: purchase_detail_id_purchase_detail_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.purchase_detail ALTER COLUMN id_purchase_detail ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.purchase_detail_id_purchase_detail_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: purchases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchases (
    id_purchase integer NOT NULL,
    id_provider integer NOT NULL,
    invoice_number character varying(4),
    purchase_date timestamp without time zone,
    record_date_purchase timestamp without time zone,
    total_purchase numeric,
    state_purchase character varying(15),
    purchase_photo bytea,
    observation_purchase character varying(100)
);


ALTER TABLE public.purchases OWNER TO postgres;

--
-- Name: purchases_id_purchase_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.purchases ALTER COLUMN id_purchase ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.purchases_id_purchase_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: returns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.returns (
    id_return integer NOT NULL,
    id_sale integer NOT NULL,
    id_product integer NOT NULL,
    return_date timestamp without time zone NOT NULL,
    return_quantity integer NOT NULL,
    return_value numeric NOT NULL,
    return_reason character varying(250) NOT NULL
);


ALTER TABLE public.returns OWNER TO postgres;

--
-- Name: returns_id_return_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.returns ALTER COLUMN id_return ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.returns_id_return_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id_role integer NOT NULL,
    name_role character varying(100) NOT NULL,
    state_role character varying(15) NOT NULL,
    modules_role character varying(150) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_role_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.roles ALTER COLUMN id_role ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_id_role_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sale_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sale_detail (
    id_sale_detail integer NOT NULL,
    id_sale integer NOT NULL,
    id_product integer NOT NULL,
    quantity integer NOT NULL,
    product_price numeric
);


ALTER TABLE public.sale_detail OWNER TO postgres;

--
-- Name: sale_detail_id_sale_detail_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.sale_detail ALTER COLUMN id_sale_detail ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sale_detail_id_sale_detail_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    id_sale integer NOT NULL,
    id_order integer NOT NULL,
    id_client integer NOT NULL,
    id_employee integer NOT NULL,
    invoice_number integer NOT NULL,
    order_date timestamp without time zone NOT NULL,
    delivery_date timestamp without time zone,
    sale_state character varying(15),
    payment_state character varying(15),
    payment_type character varying(100) NOT NULL,
    total_sale numeric NOT NULL,
    observation_return character varying(250)
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- Name: sales_id_sale_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.sales ALTER COLUMN id_sale ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sales_id_sale_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    id_role integer NOT NULL,
    id_employee integer NOT NULL,
    creation_date_user timestamp without time zone,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    state_user character varying(15),
    observation_user character varying(100)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id_user ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id_client, nit_or_id_client, name_client, last_name_client, email_client, phone_client, address_client, state_client) FROM stdin;
1	1000000000	Client 1	Last Name 1	client1@email.com	1000000000	Address 1	Active
2	2000000000	Client 2	Last Name 2	client2@email.com	2000000000	Address 2	Active
3	3000000000	Client 3	Last Name 3	client3@email.com	3000000000	Address 3	Inactive
\.


--
-- Data for Name: commission_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.commission_detail (id_commission_detail, month_commission, commission_percentage) FROM stdin;
1	2023-11-06 15:07:17.164478	10
2	2023-04-01 00:00:00	5
3	2023-05-01 00:00:00	8
\.


--
-- Data for Name: commissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.commissions (id_commission, id_employee, total_commission, id_commission_detail, total_sales) FROM stdin;
\.


--
-- Data for Name: defective_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.defective_products (id_defective_product, id_product, return_reason, return_date, return_quantity, return_value) FROM stdin;
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id_employee, id_card_employee, name_employee, email, address, phone, state_employee, observation, creation_date_employee) FROM stdin;
1	1111111111	Employee 1	employee1@email.com	Address 1	1111111111	Active	Observation 1	2023-11-06 15:07:17.164478
2	2222222222	Employee 2	employee2@email.com	Address 2	2222222222	Active	Observation 2	2023-11-06 15:07:17.164478
3	3333333333	Employee 3	employee3@email.com	Address 3	3333333333	Inactive	Observation 3	2023-11-06 15:07:17.164478
\.


--
-- Data for Name: order_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_detail (id_order_detail, id_order, id_product, product_quantity, product_price) FROM stdin;
1	1	1	30	14.00
2	2	2	25	18.00
3	3	3	20	12.00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id_order, id_client, id_employee, order_number, order_date, payment_type, order_state, delivery_state, payment_state, total_order) FROM stdin;
1	1	1	1001	2023-11-06 15:07:17.164478	Cash	Active	In Progress	To be paid	1500.00
2	2	2	1002	2023-11-06 15:07:17.164478	Credit Card	Active	To be delivered	To be paid	1200.00
3	3	3	1003	2023-11-06 15:07:17.164478	Check	Active	Delivered	To be paid	1800.00
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id_payment, id_sale, id_client, payment_date, total_payment, total_remaining) FROM stdin;
1	1	1	2023-11-06 15:07:17.164478	420.00	0.00
2	2	2	2023-11-06 15:07:17.164478	675.00	0.00
3	3	3	2023-11-06 15:07:17.164478	360.00	0.00
\.


--
-- Data for Name: product_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_categories (id_category, name_category, state_category, observation_category, creation_date_category) FROM stdin;
1	Category 1	Active	Observation 1	2023-11-06 15:07:17.164478
2	Category 2	Active	Observation 2	2023-11-06 15:07:17.164478
3	Category 3	Inactive	Observation 3	2023-11-06 15:07:17.164478
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id_product, id_category, name_product, quantity, max_stock, min_stock, cost_price, selling_price, profit, creation_date_product, state_product, observation) FROM stdin;
1	1	Product 1	100	200	50	10.00	15.00	5.00	2023-11-06 15:07:17.164478	Active	Observation 1
2	2	Product 2	150	250	75	12.00	20.00	8.00	2023-11-06 15:07:17.164478	Active	Observation 2
3	3	Product 3	75	100	25	8.00	14.00	6.00	2023-11-06 15:07:17.164478	Inactive	Observation 3
\.


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.providers (id_provider, nit_cedula, name_provider, email_provider, address_provider, phone_provider, state_provider, observation_provider, name_contact, creation_date_provider) FROM stdin;
1	1234567890	Provider 1	provider1@email.com	Address 1	1234567890	Active	Observation 1	Contact 1	2023-11-06 15:07:17.164478
2	9876543210	Provider 2	provider2@email.com	Address 2	9876543210	Active	Observation 2	Contact 2	2023-11-06 15:07:17.164478
3	5555555555	Provider 3	provider3@email.com	Address 3	5555555555	Inactive	Observation 3	Contact 3	2023-11-06 15:07:17.164478
\.


--
-- Data for Name: purchase_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchase_detail (id_purchase_detail, id_purchase, id_product, product_category, product_quantity, cost_price, selling_price, sub_total) FROM stdin;
1	1	1	Category 1	50	9.00	14.00	700.00
2	2	2	Category 2	75	11.00	18.00	1350.00
3	3	3	Category 3	40	7.00	12.00	480.00
\.


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchases (id_purchase, id_provider, invoice_number, purchase_date, record_date_purchase, total_purchase, state_purchase, purchase_photo, observation_purchase) FROM stdin;
1	1	0001	2023-11-06 15:07:17.164478	2023-11-06 15:07:17.164478	500.00	Completed	\N	Observation 1
2	2	0002	2023-11-06 15:07:17.164478	2023-11-06 15:07:17.164478	750.00	Pending	\N	Observation 2
3	3	0003	2023-11-06 15:07:17.164478	2023-11-06 15:07:17.164478	400.00	Completed	\N	Observation 3
\.


--
-- Data for Name: returns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.returns (id_return, id_sale, id_product, return_date, return_quantity, return_value, return_reason) FROM stdin;
1	1	1	2023-11-06 15:07:17.164478	5	70.00	Defecto de fábrica
2	2	2	2023-11-06 15:07:17.164478	4	72.00	Defecto de fábrica
3	3	3	2023-11-06 15:07:17.164478	6	72.00	Defecto de fábrica
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id_role, name_role, state_role, modules_role) FROM stdin;
2	Manager	Active	Module B, Module C
3	Employee	Active	Module C
1	Administrator		Module A, Module B, Module C
4	Alejandro	Activo	Usuarios, Categorías de Productos, Productos, Proveedores, Compras, Pedidos, Empleados, Clientes, Ventas, Comisiones
5	yeison	Activo	Usuarios, Categorías de Productos, Productos, Proveedores, Empleados, Compras, Clientes, Pedidos, Ventas, Comisiones
\.


--
-- Data for Name: sale_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sale_detail (id_sale_detail, id_sale, id_product, quantity, product_price) FROM stdin;
1	1	1	15	14.00
2	2	2	20	18.00
3	3	3	12	12.00
\.


--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales (id_sale, id_order, id_client, id_employee, invoice_number, order_date, delivery_date, sale_state, payment_state, payment_type, total_sale, observation_return) FROM stdin;
1	1	1	1	5001	2023-11-06 15:07:17.164478	\N	Active	To be paid	Cash	420.00	\N
2	2	2	2	5002	2023-11-06 15:07:17.164478	\N	Active	To be paid	Credit Card	675.00	\N
3	3	3	3	5003	2023-11-06 15:07:17.164478	\N	Active	Paid	Check	360.00	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, id_role, id_employee, creation_date_user, username, email, password, state_user, observation_user) FROM stdin;
1	1	1	2023-11-06 15:07:17.164478	admin	admin@email.com	password_admin	Active	Observation 1
2	2	2	2023-11-06 15:07:17.164478	manager	manager@email.com	password_manager	Active	Observation 2
3	3	3	2023-11-06 15:07:17.164478	employee	employee@email.com	password_employee	Inactive	Observation 3
\.


--
-- Name: clients_id_client_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_client_seq', 3, true);


--
-- Name: commission_detail_id_commission_detail_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commission_detail_id_commission_detail_seq', 3, true);


--
-- Name: commissions_id_commission_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commissions_id_commission_seq', 1, false);


--
-- Name: defective_products_id_defective_product_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.defective_products_id_defective_product_seq', 1, false);


--
-- Name: employees_id_employee_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_id_employee_seq', 3, true);


--
-- Name: order_detail_id_order_detail_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_detail_id_order_detail_seq', 3, true);


--
-- Name: orders_id_order_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_order_seq', 3, true);


--
-- Name: payments_id_payment_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_payment_seq', 3, true);


--
-- Name: product_categories_id_category_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_categories_id_category_seq', 3, true);


--
-- Name: products_id_product_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_product_seq', 3, true);


--
-- Name: providers_id_provider_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.providers_id_provider_seq', 3, true);


--
-- Name: purchase_detail_id_purchase_detail_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.purchase_detail_id_purchase_detail_seq', 3, true);


--
-- Name: purchases_id_purchase_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.purchases_id_purchase_seq', 3, true);


--
-- Name: returns_id_return_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.returns_id_return_seq', 3, true);


--
-- Name: roles_id_role_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_role_seq', 5, true);


--
-- Name: sale_detail_id_sale_detail_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sale_detail_id_sale_detail_seq', 3, true);


--
-- Name: sales_id_sale_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_id_sale_seq', 3, true);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 3, true);


--
-- Name: clients clients_nit_or_id_client_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_nit_or_id_client_key UNIQUE (nit_or_id_client);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id_client);


--
-- Name: commission_detail commission_detail_month_commission_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commission_detail
    ADD CONSTRAINT commission_detail_month_commission_key UNIQUE (month_commission);


--
-- Name: commission_detail commission_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commission_detail
    ADD CONSTRAINT commission_detail_pkey PRIMARY KEY (id_commission_detail);


--
-- Name: commissions commissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commissions
    ADD CONSTRAINT commissions_pkey PRIMARY KEY (id_commission);


--
-- Name: defective_products defective_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defective_products
    ADD CONSTRAINT defective_products_pkey PRIMARY KEY (id_defective_product);


--
-- Name: employees employees_id_card_employee_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_id_card_employee_key UNIQUE (id_card_employee);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id_employee);


--
-- Name: order_detail order_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_pkey PRIMARY KEY (id_order_detail);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id_order);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id_payment);


--
-- Name: product_categories product_categories_name_category_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_name_category_key UNIQUE (name_category);


--
-- Name: product_categories product_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_pkey PRIMARY KEY (id_category);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id_product);


--
-- Name: providers providers_address_provider_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_address_provider_key UNIQUE (address_provider);


--
-- Name: providers providers_email_provider_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_email_provider_key UNIQUE (email_provider);


--
-- Name: providers providers_name_contact_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_name_contact_key UNIQUE (name_contact);


--
-- Name: providers providers_name_provider_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_name_provider_key UNIQUE (name_provider);


--
-- Name: providers providers_nit_cedula_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_nit_cedula_key UNIQUE (nit_cedula);


--
-- Name: providers providers_phone_provider_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_phone_provider_key UNIQUE (phone_provider);


--
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id_provider);


--
-- Name: purchase_detail purchase_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_detail
    ADD CONSTRAINT purchase_detail_pkey PRIMARY KEY (id_purchase_detail);


--
-- Name: purchases purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id_purchase);


--
-- Name: returns returns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.returns
    ADD CONSTRAINT returns_pkey PRIMARY KEY (id_return);


--
-- Name: roles roles_name_role_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_role_key UNIQUE (name_role);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_role);


--
-- Name: sale_detail sale_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sale_detail
    ADD CONSTRAINT sale_detail_pkey PRIMARY KEY (id_sale_detail);


--
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id_sale);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: commissions fk_commissionscommissiondetail; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commissions
    ADD CONSTRAINT fk_commissionscommissiondetail FOREIGN KEY (id_commission_detail) REFERENCES public.commission_detail(id_commission_detail);


--
-- Name: commissions fk_commissionsemployee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commissions
    ADD CONSTRAINT fk_commissionsemployee FOREIGN KEY (id_employee) REFERENCES public.employees(id_employee);


--
-- Name: defective_products fk_defectiveproductsproduct; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defective_products
    ADD CONSTRAINT fk_defectiveproductsproduct FOREIGN KEY (id_product) REFERENCES public.products(id_product);


--
-- Name: order_detail fk_orderdetailorder; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT fk_orderdetailorder FOREIGN KEY (id_order) REFERENCES public.orders(id_order);


--
-- Name: order_detail fk_orderdetailproduct; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT fk_orderdetailproduct FOREIGN KEY (id_product) REFERENCES public.products(id_product);


--
-- Name: payments fk_paymentsclient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_paymentsclient FOREIGN KEY (id_client) REFERENCES public.clients(id_client);


--
-- Name: payments fk_paymentssale; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_paymentssale FOREIGN KEY (id_sale) REFERENCES public.sales(id_sale);


--
-- Name: products fk_productscategory; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_productscategory FOREIGN KEY (id_category) REFERENCES public.product_categories(id_category);


--
-- Name: purchase_detail fk_purchasedetailproduct; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_detail
    ADD CONSTRAINT fk_purchasedetailproduct FOREIGN KEY (id_product) REFERENCES public.products(id_product);


--
-- Name: purchase_detail fk_purchasedetailpurchase; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchase_detail
    ADD CONSTRAINT fk_purchasedetailpurchase FOREIGN KEY (id_purchase) REFERENCES public.purchases(id_purchase);


--
-- Name: purchases fk_purchasesprovider; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT fk_purchasesprovider FOREIGN KEY (id_provider) REFERENCES public.providers(id_provider);


--
-- Name: returns fk_returnsproduct; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.returns
    ADD CONSTRAINT fk_returnsproduct FOREIGN KEY (id_product) REFERENCES public.products(id_product);


--
-- Name: returns fk_returnssale; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.returns
    ADD CONSTRAINT fk_returnssale FOREIGN KEY (id_sale) REFERENCES public.sales(id_sale);


--
-- Name: sales fk_salesclient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT fk_salesclient FOREIGN KEY (id_client) REFERENCES public.clients(id_client);


--
-- Name: sales fk_salesemployee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT fk_salesemployee FOREIGN KEY (id_employee) REFERENCES public.employees(id_employee);


--
-- Name: sales fk_salesorder; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT fk_salesorder FOREIGN KEY (id_order) REFERENCES public.orders(id_order);


--
-- Name: users fk_usersemployee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_usersemployee FOREIGN KEY (id_employee) REFERENCES public.employees(id_employee);


--
-- Name: users fk_usersrole; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_usersrole FOREIGN KEY (id_role) REFERENCES public.roles(id_role);


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO PUBLIC;


--
-- PostgreSQL database dump complete
--

