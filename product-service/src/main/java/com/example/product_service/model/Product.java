package com.example.product_service.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data //it is a lombok annotation to generate getters,setters, toString etc.
@Document(collection = "products") //marks this class as a MongoDB document.
public class Product {
    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private String category;
    private Date createdAt = new Date();
}
