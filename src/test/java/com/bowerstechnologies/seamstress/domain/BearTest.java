package com.bowerstechnologies.seamstress.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.bowerstechnologies.seamstress.web.rest.TestUtil;

public class BearTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bear.class);
        Bear bear1 = new Bear();
        bear1.setId(1L);
        Bear bear2 = new Bear();
        bear2.setId(bear1.getId());
        assertThat(bear1).isEqualTo(bear2);
        bear2.setId(2L);
        assertThat(bear1).isNotEqualTo(bear2);
        bear1.setId(null);
        assertThat(bear1).isNotEqualTo(bear2);
    }
}
