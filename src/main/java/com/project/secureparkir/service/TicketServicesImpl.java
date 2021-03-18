package com.project.secureparkir.service;

import com.project.secureparkir.model.Ticket;
import com.project.secureparkir.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ticketService")
public class TicketServicesImpl implements TicketServices {

    @Autowired
    TicketRepository ticketRepository;

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
}
