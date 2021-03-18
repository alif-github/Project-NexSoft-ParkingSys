package com.project.secureparkir.service;

import com.project.secureparkir.model.Ticket;
import com.project.secureparkir.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service("ticketService")
public class TicketServicesImpl implements TicketServices {

    @Autowired
    TicketRepository ticketRepository;

    @Override
    public Ticket findLastId() {
        Ticket ticket;
        try {
            ticket = ticketRepository.findLastId();
        } catch (Exception e) {
            ticket = null;
        }
        return ticket;
    }

    @Override
    public Ticket findLastIdForMember(String idMember) {
        Ticket ticket;
        try {
            ticket = ticketRepository.findLastIdForMember(idMember);
        } catch (Exception e) {
            ticket = null;
        }
        return ticket;
    }

    @Override
    public void createTicket(Boolean isMember, String idMember, Ticket ticket) {
        //untuk mensinkronkan penulisan data ke memori
        synchronized (this) {
            ticketRepository.createTicket(isMember, idMember, ticket);
        }
    }

    @Override
    public List<Ticket> findById(String id) {
        List<Ticket> tickets;
        try {
            tickets = ticketRepository.findById(id);
        } catch (Exception e) {
            tickets = null;
        }
        return tickets;
    }

    @Override
    public void exitTicket(Boolean isMember, String id, Ticket ticket) {
        synchronized (this) {
            ticketRepository.exitTicket(isMember, id, ticket);
        }
    }

    @Override
    public List<Ticket> readDataByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";
            String pagging = "";

            ArrayList<String> whereQuery = new ArrayList<>();
            ArrayList<String> pageQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);
            if (!pageQuery.isEmpty()) {
                pagging += String.join(" ", pageQuery);
            }
            return ticketRepository.readDataByQuery(query,pagging);
        }
    }
}
