package com.waterqualitymonitoring.crowdsourcedataservice;

import com.waterqualitymonitoring.crowdsourcedataservice.config.KeycloakProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.waterqualitymonitoring.crowdsourcedataservice.feignclient")
@EnableConfigurationProperties(KeycloakProperties.class)
public class CrowdSourceDataServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrowdSourceDataServiceApplication.class, args);
	}

}
