package com.bowerstechnologies.seamstress.web.rest;

import com.bowerstechnologies.seamstress.SeamstressOnCallApp;
import com.bowerstechnologies.seamstress.domain.CustomerOrder;
import com.bowerstechnologies.seamstress.repository.CustomerOrderRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CustomerOrderResource} REST controller.
 */
@SpringBootTest(classes = SeamstressOnCallApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CustomerOrderResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_PLACED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PLACED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_PROMISED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PROMISED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_TOTAL_PRICE = new BigDecimal(0);
    private static final BigDecimal UPDATED_TOTAL_PRICE = new BigDecimal(1);

    private static final BigDecimal DEFAULT_TOTAL_PAID = new BigDecimal(0);
    private static final BigDecimal UPDATED_TOTAL_PAID = new BigDecimal(1);

    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCustomerOrderMockMvc;

    private CustomerOrder customerOrder;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerOrder createEntity(EntityManager em) {
        CustomerOrder customerOrder = new CustomerOrder()
            .description(DEFAULT_DESCRIPTION)
            .placedDate(DEFAULT_PLACED_DATE)
            .promisedDate(DEFAULT_PROMISED_DATE)
            .totalPrice(DEFAULT_TOTAL_PRICE)
            .totalPaid(DEFAULT_TOTAL_PAID);
        return customerOrder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerOrder createUpdatedEntity(EntityManager em) {
        CustomerOrder customerOrder = new CustomerOrder()
            .description(UPDATED_DESCRIPTION)
            .placedDate(UPDATED_PLACED_DATE)
            .promisedDate(UPDATED_PROMISED_DATE)
            .totalPrice(UPDATED_TOTAL_PRICE)
            .totalPaid(UPDATED_TOTAL_PAID);
        return customerOrder;
    }

    @BeforeEach
    public void initTest() {
        customerOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerOrder() throws Exception {
        int databaseSizeBeforeCreate = customerOrderRepository.findAll().size();
        // Create the CustomerOrder
        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isCreated());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerOrder testCustomerOrder = customerOrderList.get(customerOrderList.size() - 1);
        assertThat(testCustomerOrder.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCustomerOrder.getPlacedDate()).isEqualTo(DEFAULT_PLACED_DATE);
        assertThat(testCustomerOrder.getPromisedDate()).isEqualTo(DEFAULT_PROMISED_DATE);
        assertThat(testCustomerOrder.getTotalPrice()).isEqualTo(DEFAULT_TOTAL_PRICE);
        assertThat(testCustomerOrder.getTotalPaid()).isEqualTo(DEFAULT_TOTAL_PAID);
    }

    @Test
    @Transactional
    public void createCustomerOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerOrderRepository.findAll().size();

        // Create the CustomerOrder with an existing ID
        customerOrder.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerOrderRepository.findAll().size();
        // set the field null
        customerOrder.setDescription(null);

        // Create the CustomerOrder, which fails.


        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isBadRequest());

        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPlacedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerOrderRepository.findAll().size();
        // set the field null
        customerOrder.setPlacedDate(null);

        // Create the CustomerOrder, which fails.


        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isBadRequest());

        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPromisedDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerOrderRepository.findAll().size();
        // set the field null
        customerOrder.setPromisedDate(null);

        // Create the CustomerOrder, which fails.


        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isBadRequest());

        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerOrderRepository.findAll().size();
        // set the field null
        customerOrder.setTotalPrice(null);

        // Create the CustomerOrder, which fails.


        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isBadRequest());

        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalPaidIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerOrderRepository.findAll().size();
        // set the field null
        customerOrder.setTotalPaid(null);

        // Create the CustomerOrder, which fails.


        restCustomerOrderMockMvc.perform(post("/api/customer-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isBadRequest());

        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomerOrders() throws Exception {
        // Initialize the database
        customerOrderRepository.saveAndFlush(customerOrder);

        // Get all the customerOrderList
        restCustomerOrderMockMvc.perform(get("/api/customer-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].placedDate").value(hasItem(DEFAULT_PLACED_DATE.toString())))
            .andExpect(jsonPath("$.[*].promisedDate").value(hasItem(DEFAULT_PROMISED_DATE.toString())))
            .andExpect(jsonPath("$.[*].totalPrice").value(hasItem(DEFAULT_TOTAL_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].totalPaid").value(hasItem(DEFAULT_TOTAL_PAID.intValue())));
    }
    
    @Test
    @Transactional
    public void getCustomerOrder() throws Exception {
        // Initialize the database
        customerOrderRepository.saveAndFlush(customerOrder);

        // Get the customerOrder
        restCustomerOrderMockMvc.perform(get("/api/customer-orders/{id}", customerOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(customerOrder.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.placedDate").value(DEFAULT_PLACED_DATE.toString()))
            .andExpect(jsonPath("$.promisedDate").value(DEFAULT_PROMISED_DATE.toString()))
            .andExpect(jsonPath("$.totalPrice").value(DEFAULT_TOTAL_PRICE.intValue()))
            .andExpect(jsonPath("$.totalPaid").value(DEFAULT_TOTAL_PAID.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCustomerOrder() throws Exception {
        // Get the customerOrder
        restCustomerOrderMockMvc.perform(get("/api/customer-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerOrder() throws Exception {
        // Initialize the database
        customerOrderRepository.saveAndFlush(customerOrder);

        int databaseSizeBeforeUpdate = customerOrderRepository.findAll().size();

        // Update the customerOrder
        CustomerOrder updatedCustomerOrder = customerOrderRepository.findById(customerOrder.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerOrder are not directly saved in db
        em.detach(updatedCustomerOrder);
        updatedCustomerOrder
            .description(UPDATED_DESCRIPTION)
            .placedDate(UPDATED_PLACED_DATE)
            .promisedDate(UPDATED_PROMISED_DATE)
            .totalPrice(UPDATED_TOTAL_PRICE)
            .totalPaid(UPDATED_TOTAL_PAID);

        restCustomerOrderMockMvc.perform(put("/api/customer-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomerOrder)))
            .andExpect(status().isOk());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeUpdate);
        CustomerOrder testCustomerOrder = customerOrderList.get(customerOrderList.size() - 1);
        assertThat(testCustomerOrder.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCustomerOrder.getPlacedDate()).isEqualTo(UPDATED_PLACED_DATE);
        assertThat(testCustomerOrder.getPromisedDate()).isEqualTo(UPDATED_PROMISED_DATE);
        assertThat(testCustomerOrder.getTotalPrice()).isEqualTo(UPDATED_TOTAL_PRICE);
        assertThat(testCustomerOrder.getTotalPaid()).isEqualTo(UPDATED_TOTAL_PAID);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerOrder() throws Exception {
        int databaseSizeBeforeUpdate = customerOrderRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerOrderMockMvc.perform(put("/api/customer-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerOrder)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerOrder in the database
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomerOrder() throws Exception {
        // Initialize the database
        customerOrderRepository.saveAndFlush(customerOrder);

        int databaseSizeBeforeDelete = customerOrderRepository.findAll().size();

        // Delete the customerOrder
        restCustomerOrderMockMvc.perform(delete("/api/customer-orders/{id}", customerOrder.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CustomerOrder> customerOrderList = customerOrderRepository.findAll();
        assertThat(customerOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
