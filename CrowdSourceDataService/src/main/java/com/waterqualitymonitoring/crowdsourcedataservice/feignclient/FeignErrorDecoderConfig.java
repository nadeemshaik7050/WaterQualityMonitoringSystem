package com.waterqualitymonitoring.crowdsourcedataservice.feignclient;

import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceError;
import com.waterqualitymonitoring.crowdsourcedataservice.exception.CrowdDataSourceFeignException;
import feign.Response;
import feign.codec.ErrorDecoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignErrorDecoderConfig {

    @Bean
    public ErrorDecoder errorDecoder() {
        return new CustomErrorDecoder();
    }

    static class CustomErrorDecoder implements ErrorDecoder {

        private final ErrorDecoder defaultDecoder = new Default();

        @Override
        public Exception decode(String methodKey, Response response) {
            switch (response.status()) {
                case 404:
                    return new CrowdDataSourceFeignException(CrowdDataSourceError.INVALID_REQUEST);
                case 500:
                    return new CrowdDataSourceFeignException(CrowdDataSourceError.SERVICE_INTERNAL_ERROR);
                default:
                    return defaultDecoder.decode(methodKey, response);
            }
        }
    }
}
