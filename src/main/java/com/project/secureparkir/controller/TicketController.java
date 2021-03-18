package com.project.secureparkir.controller;

import com.project.secureparkir.model.Member;
import com.project.secureparkir.model.Ticket;
import com.project.secureparkir.service.MemberServices;
import com.project.secureparkir.service.TicketServices;
import com.project.secureparkir.util.CustomErrorType;
import com.project.secureparkir.util.CustomSuccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/ticket")
public class TicketController {

    public static final Logger logger = LoggerFactory.getLogger(TicketController.class);

    @Autowired
    TicketServices ticketServices;

    @Autowired
    MemberServices memberServices;

    //Parking in create data pengunjung
    @PostMapping("/parking-in/")
    public ResponseEntity<?> parkingIn(@RequestParam("isMember") int isMember, @RequestBody Ticket ticket) {
        logger.info("Create parking in");
        Boolean isMemberTemp = null;
        if (isMember == 1) {
            isMemberTemp = true;
        } else if (isMember == 0) {
            isMemberTemp = false;
        }

        if (isMemberTemp) {
            //ini member
            List<Ticket> ticket1 = ticketServices.findById(ticket.getId());
            Member member = memberServices.findByIdMember(ticket.getId());

            if (member == null) {
                return new ResponseEntity<>(new CustomErrorType("Member isn't exist"), HttpStatus.BAD_REQUEST);
            } else {
                if (!member.getStatus()) {
                    return new ResponseEntity<>(new CustomErrorType("Member is Non-Active"), HttpStatus.BAD_REQUEST);
                } else if (!ticket1.isEmpty() && ticket1.get(ticket1.size()-1).getTglJamKeluar().equalsIgnoreCase("-")) {
                    return new ResponseEntity<>(new CustomErrorType("Cannot Click Entry Twice!"), HttpStatus.BAD_REQUEST);
                } else {
                    ticketServices.createTicket(isMemberTemp, ticket.getId(), ticket);
                    return new ResponseEntity<>(new CustomSuccessType("Parking In Success"), HttpStatus.CREATED);
                }
            }
        } else {
            //ini reguler
            ticketServices.createTicket(isMemberTemp, ticket.getId(), ticket);
            return new ResponseEntity<>(new CustomSuccessType("Parking In Success"), HttpStatus.CREATED);
        }
    }

    @GetMapping("/find/")
    public ResponseEntity<List<Ticket>> findById(@RequestParam("id") String id) {
        List<Ticket> ticketList = ticketServices.findById(id);
        if (ticketList.isEmpty()) {
            return new ResponseEntity<>(ticketList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(ticketList, HttpStatus.OK);
        }
    }
}
