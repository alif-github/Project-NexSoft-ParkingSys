package com.project.secureparkir.service;

import com.project.secureparkir.model.Ticket;

import java.util.List;
import java.util.Map;

public interface TicketServices {

    //findLastIdUser
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

    //Read Data by query
    List<Ticket> readDataByQuery(Map<Object, Object> params);

    //Count Data by query
    int countAllDataByQuery(Map <Object, Object> params);

    //Count Data by Query
    int countInByQuery(Map <Object, Object> params);

    //Count Data by Query
    int countOutByQuery(Map <Object, Object> params);

    //Sum Data by Query
    Double sumAllDataByQuery(Map <Object, Object> params);

    //Sum Biaya Parkir by Query
    Double sumBiayaParkirByQuery(Map <Object, Object> params);
}
