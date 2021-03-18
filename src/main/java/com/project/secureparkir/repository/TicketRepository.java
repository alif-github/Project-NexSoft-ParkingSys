package com.project.secureparkir.repository;

import com.project.secureparkir.model.Ticket;

import java.util.List;

public interface TicketRepository {

    //CRUD Maintenance, relation to databases!

    //Generate String Random id
    String generateRandomString(int length);

    //findLastIdPengunjung
    Ticket findLastId();

    //findLastIdMember
    Ticket findLastIdForMember(String idMember);

    //Create Ticket
    void createTicket(Boolean isMember, String idMember, Ticket ticket);

    //Find by id
    //Read the Data by idMember
    List<Ticket> findById(String id);

    //Update the Data
    //Exit ticket
    void exitTicket(Boolean isMember, String id, Ticket ticket);

    //Read Data by Query
    List<Ticket> readDataByQuery(String query, String pagging);
}
