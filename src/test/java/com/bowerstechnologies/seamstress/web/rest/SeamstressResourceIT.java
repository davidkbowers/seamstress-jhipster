package com.bowerstechnologies.seamstress.web.rest;

import com.bowerstechnologies.seamstress.SeamstressOnCallApp;
import com.bowerstechnologies.seamstress.domain.Seamstress;
import com.bowerstechnologies.seamstress.repository.SeamstressRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SeamstressResource} REST controller.
 */
@SpringBootTest(classes = SeamstressOnCallApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SeamstressResourceIT {

    private static final String DEFAULT_IMAGE_FILE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_FILE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_ADDED = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ADDED = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_SORT_POSITION = 1;
    private static final Integer UPDATED_SORT_POSITION = 2;

    @Autowired
    private SeamstressRepository seamstressRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSeamstressMockMvc;

    private Seamstress seamstress;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Seamstress createEntity(EntityManager em) {
        Seamstress seamstress = new Seamstress()
            .imageFile(DEFAULT_IMAGE_FILE)
            .description(DEFAULT_DESCRIPTION)
            .dateAdded(DEFAULT_DATE_ADDED)
            .sortPosition(DEFAULT_SORT_POSITION);
        return seamstress;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Seamstress createUpdatedEntity(EntityManager em) {
        Seamstress seamstress = new Seamstress()
            .imageFile(UPDATED_IMAGE_FILE)
            .description(UPDATED_DESCRIPTION)
            .dateAdded(UPDATED_DATE_ADDED)
            .sortPosition(UPDATED_SORT_POSITION);
        return seamstress;
    }

    @BeforeEach
    public void initTest() {
        seamstress = createEntity(em);
    }

    @Test
    @Transactional
    public void createSeamstress() throws Exception {
        int databaseSizeBeforeCreate = seamstressRepository.findAll().size();
        // Create the Seamstress
        restSeamstressMockMvc.perform(post("/api/seamstresses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(seamstress)))
            .andExpect(status().isCreated());

        // Validate the Seamstress in the database
        List<Seamstress> seamstressList = seamstressRepository.findAll();
        assertThat(seamstressList).hasSize(databaseSizeBeforeCreate + 1);
        Seamstress testSeamstress = seamstressList.get(seamstressList.size() - 1);
        assertThat(testSeamstress.getImageFile()).isEqualTo(DEFAULT_IMAGE_FILE);
        assertThat(testSeamstress.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSeamstress.getDateAdded()).isEqualTo(DEFAULT_DATE_ADDED);
        assertThat(testSeamstress.getSortPosition()).isEqualTo(DEFAULT_SORT_POSITION);
    }

    @Test
    @Transactional
    public void createSeamstressWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = seamstressRepository.findAll().size();

        // Create the Seamstress with an existing ID
        seamstress.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeamstressMockMvc.perform(post("/api/seamstresses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(seamstress)))
            .andExpect(status().isBadRequest());

        // Validate the Seamstress in the database
        List<Seamstress> seamstressList = seamstressRepository.findAll();
        assertThat(seamstressList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkImageFileIsRequired() throws Exception {
        int databaseSizeBeforeTest = seamstressRepository.findAll().size();
        // set the field null
        seamstress.setImageFile(null);

        // Create the Seamstress, which fails.


        restSeamstressMockMvc.perform(post("/api/seamstresses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(seamstress)))
            .andExpect(status().isBadRequest());

        List<Seamstress> seamstressList = seamstressRepository.findAll();
        assertThat(seamstressList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSeamstresses() throws Exception {
        // Initialize the database
        seamstressRepository.saveAndFlush(seamstress);

        // Get all the seamstressList
        restSeamstressMockMvc.perform(get("/api/seamstresses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(seamstress.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageFile").value(hasItem(DEFAULT_IMAGE_FILE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].dateAdded").value(hasItem(DEFAULT_DATE_ADDED.toString())))
            .andExpect(jsonPath("$.[*].sortPosition").value(hasItem(DEFAULT_SORT_POSITION)));
    }
    
    @Test
    @Transactional
    public void getSeamstress() throws Exception {
        // Initialize the database
        seamstressRepository.saveAndFlush(seamstress);

        // Get the seamstress
        restSeamstressMockMvc.perform(get("/api/seamstresses/{id}", seamstress.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(seamstress.getId().intValue()))
            .andExpect(jsonPath("$.imageFile").value(DEFAULT_IMAGE_FILE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.dateAdded").value(DEFAULT_DATE_ADDED.toString()))
            .andExpect(jsonPath("$.sortPosition").value(DEFAULT_SORT_POSITION));
    }
    @Test
    @Transactional
    public void getNonExistingSeamstress() throws Exception {
        // Get the seamstress
        restSeamstressMockMvc.perform(get("/api/seamstresses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSeamstress() throws Exception {
        // Initialize the database
        seamstressRepository.saveAndFlush(seamstress);

        int databaseSizeBeforeUpdate = seamstressRepository.findAll().size();

        // Update the seamstress
        Seamstress updatedSeamstress = seamstressRepository.findById(seamstress.getId()).get();
        // Disconnect from session so that the updates on updatedSeamstress are not directly saved in db
        em.detach(updatedSeamstress);
        updatedSeamstress
            .imageFile(UPDATED_IMAGE_FILE)
            .description(UPDATED_DESCRIPTION)
            .dateAdded(UPDATED_DATE_ADDED)
            .sortPosition(UPDATED_SORT_POSITION);

        restSeamstressMockMvc.perform(put("/api/seamstresses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSeamstress)))
            .andExpect(status().isOk());

        // Validate the Seamstress in the database
        List<Seamstress> seamstressList = seamstressRepository.findAll();
        assertThat(seamstressList).hasSize(databaseSizeBeforeUpdate);
        Seamstress testSeamstress = seamstressList.get(seamstressList.size() - 1);
        assertThat(testSeamstress.getImageFile()).isEqualTo(UPDATED_IMAGE_FILE);
        assertThat(testSeamstress.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSeamstress.getDateAdded()).isEqualTo(UPDATED_DATE_ADDED);
        assertThat(testSeamstress.getSortPosition()).isEqualTo(UPDATED_SORT_POSITION);
    }

    @Test
    @Transactional
    public void updateNonExistingSeamstress() throws Exception {
        int databaseSizeBeforeUpdate = seamstressRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSeamstressMockMvc.perform(put("/api/seamstresses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(seamstress)))
            .andExpect(status().isBadRequest());

        // Validate the Seamstress in the database
        List<Seamstress> seamstressList = seamstressRepository.findAll();
        assertThat(seamstressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSeamstress() throws Exception {
        // Initialize the database
        seamstressRepository.saveAndFlush(seamstress);

        int databaseSizeBeforeDelete = seamstressRepository.findAll().size();

        // Delete the seamstress
        restSeamstressMockMvc.perform(delete("/api/seamstresses/{id}", seamstress.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Seamstress> seamstressList = seamstressRepository.findAll();
        assertThat(seamstressList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
