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
    Ticket findLastIdWithParams(String id);

    //Create Ticket
    void createTicket(Boolean isMember, String idMember, Ticket ticket);

    //Find by id
    //Read the Data by idMember
    List<Ticket> findById(String id);

    //Update the Data
    //Exit ticket
    void exitTicket(Boolean isMember, String id, Ticket ticket);

    //Update the Data
    void updateTicket(String idData, Double jumlahDenda, Ticket ticket);

    //Read Data by Query
    List<Ticket> readDataByQuery(String query, String pagging);
}
