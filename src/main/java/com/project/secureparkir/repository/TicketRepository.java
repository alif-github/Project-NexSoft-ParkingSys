package com.project.secureparkir.repository;

import com.project.secureparkir.model.Ticket;

import java.util.List;

public interface TicketRepository {

    //CRUD Maintenance, relation to databases!

    //Generate String Random id
    String generateRandomString(int length);

    //findLastIdPengunjung
    Ticket findLastId();

    //findLastPersonById
    Ticket findLastIdWithParams(String id);

    //findLastPersonByNoPol
    Ticket findLastNoPolWithParams(String noPol);

    //Create Ticket
    void createTicket(Boolean isMember, String idMember, Ticket ticket);

    //Find by id
    //Read the Data by idMember
    List<Ticket> findById(String id);

    //Update the Data
    //Exit ticket
    void exitTicketNormal(String idData, Ticket ticket);

    //Update the Data
    //Exit ticket
    void exitTicketDenda(String idData, String id, Ticket ticket);

    //Update the Data
    void updateTicket(String idData, Double jumlahDenda, Ticket ticket);

    //Read Data by Query
    List<Ticket> readDataByQuery(String query, String pagging);

    //Count Data by Query
    int countAllDataByQuery(String query);

    //Count Data by Query
    int countInByQuery(String query);

    //Count Data by Query
    int countOutByQuery(String query);

    //Sum Daya by Query
    Double sumAllDataByQuery(String query);
}
