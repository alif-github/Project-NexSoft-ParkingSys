package com.project.secureparkir.repository;

import com.project.secureparkir.model.Ticket;

import java.util.List;

public interface TicketRepository {

    //CRUD Maintenance, relation to databases!

    //Generate String Random id
    String generateRandomString(int length);

    //Create Ticket
    void createTicket(Boolean isMember, String idMember, Ticket ticket);

    //Find by id
    //Read the Data by idMember
    List<Ticket> findById(String id);
}
