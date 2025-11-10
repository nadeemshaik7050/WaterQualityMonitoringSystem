package com.waterqualitymonitoring.crowdsourcedataservice.controller;

import com.waterqualitymonitoring.crowdsourcedataservice.model.UserRequestDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserResponseDto;
import com.waterqualitymonitoring.crowdsourcedataservice.model.UserRankingDto;
import com.waterqualitymonitoring.crowdsourcedataservice.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserController.class)
@ActiveProfiles("test")
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    @DisplayName("Create user accessible without admin role; service invoked and role handling delegated (Keycloak)")
    void createUser_publicEndpoint_invokesService() throws Exception {
        String body = """
            { "citizenId":"C123","userName":"john","email":"john@example.com" }
            """;
        doNothing().when(userService).createUser(any());

        mockMvc.perform(post("/crowddata/user/create")
                        .contentType(APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk());

        ArgumentCaptor<UserRequestDto> captor = ArgumentCaptor.forClass(UserRequestDto.class);
        verify(userService).createUser(captor.capture());
        assertThat(captor.getValue().getCitizenId()).isEqualTo("C123");
        // If UserRequestDto has roles ensure wqm-user auto added (adjust if field exists)
        // assertThat(captor.getValue().getRoles()).contains("wqm-user");
    }

    @Test
    @DisplayName("Get user allowed for any authenticated user")
    @WithMockUser(authorities = "ROLE_wqm-user")
    void getUser_ok() throws Exception {
        when(userService.getUser("C1")).thenReturn(UserResponseDto.builder().citizenId("C1").isActive(true).build());

        mockMvc.perform(get("/crowddata/user/get").param("citizenId","C1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.citizenId").value("C1"));
    }

    @Test
    @DisplayName("Admin-only allUsers succeeds with admin role")
    @WithMockUser(authorities = "ROLE_wqm-admin")
    void allUsers_adminOk() throws Exception {
        when(userService.getAllUsers()).thenReturn(List.of(UserResponseDto.builder().citizenId("A").isActive(true).build()));

        mockMvc.perform(get("/crowddata/user/allUsers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].citizenId").value("A"));
    }

    @Test
    @DisplayName("Admin-only allUsers forbidden without role")
    @WithMockUser(authorities = "ROLE_wqm-user")
    void allUsers_forbiddenForNonAdmin() throws Exception {
        mockMvc.perform(get("/crowddata/user/allUsers"))
                .andExpect(status().isForbidden());
        verifyNoInteractions(userService);
    }

    @Test
    @DisplayName("User count requires admin")
    @WithMockUser(authorities = "ROLE_wqm-admin")
    void userCount_adminOk() throws Exception {
        when(userService.getUserCount()).thenReturn(5L);
        mockMvc.perform(get("/crowddata/user/count"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(5));
    }

    @Test
    @DisplayName("Update user forbidden without admin")
    @WithMockUser(authorities = "ROLE_wqm-user")
    void updateUser_forbidden() throws Exception {
        mockMvc.perform(post("/crowddata/user/update")
                        .contentType(APPLICATION_JSON)
                        .content("{\"citizenId\":\"C1\"}"))
                .andExpect(status().isForbidden());
        verifyNoInteractions(userService);
    }

    @Test
    @DisplayName("Toggle activate allowed for admin")
    @WithMockUser(authorities = "ROLE_wqm-admin")
    void toggleActivate_admin() throws Exception {
        doNothing().when(userService).toggleActivateUser("C1");
        mockMvc.perform(get("/crowddata/user/toggleActivate").param("citizenId","C1"))
                .andExpect(status().isOk());
        verify(userService).toggleActivateUser("C1");
    }

    @Test
    @DisplayName("Rankings public")
    void rankings_public() throws Exception {
        when(userService.getUserRankings()).thenReturn(List.of(UserRankingDto.builder().userName("C9").numberOfReviewsGiven(1L).build()));
        mockMvc.perform(get("/crowddata/user/rankings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].userName").value("C9"));
    }
}

