package com.project.secureparkir.service;

import com.project.secureparkir.model.Ticket;

import java.util.List;

public interface TicketServices {

    //Create Ticket
    void createTicket(Boolean isMember, String idMember, Ticket ticket);

    //Find by id
    //Read the Data by idMember
    List<Ticket> findById(String id);
}
