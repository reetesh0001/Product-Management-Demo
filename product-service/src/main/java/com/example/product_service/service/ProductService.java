package com.example.product_service.service;

import com.example.product_service.model.Product;
import com.example.product_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private KafkaTemplate<String, Product> kafkaTemplate;

    private static final String KAFKA_TOPIC = "product-events";
    public List<Product> getAllProducts(){
            return productRepository.findAll();
    }
    public Optional<Product> getProductById(String id){
        return productRepository.findById(id);
    }
    public Product createProduct(Product product){
        Product savedProduct = productRepository.save(product);
        //sending message to kafka, after the product is created
        kafkaTemplate.send(KAFKA_TOPIC, savedProduct);
        return savedProduct;
    }
    public Optional<Product> updateProduct(String id,Product productDetails){
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setPrice(productDetails.getPrice());
            product.setCategory(productDetails.getCategory());
            product.setDescription(productDetails.getDescription());
            return productRepository.save(product);
        });
    }
    public boolean deleteProduct(String id){
        return productRepository.findById(id).map(product -> {
            productRepository.delete(product);
            return true;
        }).orElse(false);
    }
}
