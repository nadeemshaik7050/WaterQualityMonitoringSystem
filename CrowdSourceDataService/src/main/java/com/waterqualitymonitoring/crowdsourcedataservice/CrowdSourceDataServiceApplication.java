package com.waterqualitymonitoring.crowdsourcedataservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.waterqualitymonitoring.crowdsourcedataservice.feignclient")
public class CrowdSourceDataServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrowdSourceDataServiceApplication.class, args);
	}

}
