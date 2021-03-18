package com.project.secureparkir.service;

import com.project.secureparkir.model.Ticket;

import java.util.List;
import java.util.Map;

public interface TicketServices {

    //findLastIdUser
    Ticket findLastId();

    //findLastIdMember
    Ticket findLastIdWithParams(String id);

    //Create Ticket
    void createTicket(Boolean isMember, String idMember, Ticket ticket);

    //Find by id
    //Read the Data by idMember
    List<Ticket> findById(String id);

    //Update the Data
    //Exit ticket
    void exitTicket(Boolean isMember, String id, Ticket ticket);

    //Read Data by query
    List<Ticket> readDataByQuery(Map<Object, Object> params);
}
