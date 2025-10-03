package com.example.product_service.messaging;

import com.example.product_service.model.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaConsumerService.class);
    @KafkaListener(topics = "product-events" , groupId = "product-group")
    public void consume(Product product){
        LOGGER.info(String.format("Product creation event received => %s", product));
    }
}
