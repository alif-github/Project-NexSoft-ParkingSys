package com.project.secureparkir.controller;

import com.ctc.wstx.io.ReaderSource;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        Map<String, Object> output = new HashMap<>();

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
                    output.put("id",ticketServices.findLastId().getId());
                    output.put("message",new CustomSuccessType("Parking In Success"));
                    return new ResponseEntity<>(output, HttpStatus.CREATED);
                }
            }
        } else {
            //ini reguler
            ticketServices.createTicket(isMemberTemp, ticket.getId(), ticket);
            output.put("id",ticketServices.findLastId().getId());
            output.put("message",new CustomSuccessType("Parking In Success"));
            return new ResponseEntity<>(output, HttpStatus.CREATED);
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

    @GetMapping("/find-single/")
    public ResponseEntity<?> showSinglePengunjungById(@RequestParam("id") String id) {
        logger.info("Show data by id");

        Ticket ticket = ticketServices.findLastIdWithParams(id);
        if (ticket == null) {
            return new ResponseEntity<>(new CustomErrorType("not found"), HttpStatus.NOT_FOUND);
        } else {
            if (ticket.getTglJamKeluar().equalsIgnoreCase("-")) {
                return new ResponseEntity<>(ticket, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new CustomErrorType("not found"), HttpStatus.CONFLICT);
            }
        }
    }

    @PutMapping("/parkir-out/")
    public ResponseEntity<?> parkingOut(@RequestParam("isMember") int isMember, @RequestParam("id") String id, @RequestBody Ticket ticket) {
        logger.info("Update for exit");
        Ticket dataPengunjung = ticketServices.findLastIdWithParams(id);

        Boolean isMemberTemp = null;
        if (isMember == 1) isMemberTemp = true;
        else if (isMember == 0) isMemberTemp = false;

        if (isMemberTemp && dataPengunjung.getId().contains("MEMBER-")) {
            if (dataPengunjung == null) {
                //data member tidak ditemukan
                return new ResponseEntity<>(new CustomErrorType("Parking out failed"), HttpStatus.BAD_REQUEST);
            } else {
                //data member ditemukan
                ticketServices.exitTicket(isMemberTemp, dataPengunjung.getIdData(), ticket);
                return new ResponseEntity<>(new CustomSuccessType("Parking out success"), HttpStatus.OK);
            }
        } else {
            if (dataPengunjung == null) {
                //data reguler tidak ditemukan
                return new ResponseEntity<>(new CustomErrorType("Parking out failed"), HttpStatus.BAD_REQUEST);
            } else {
                //data reguler ditemukan
                ticketServices.exitTicket(isMemberTemp, dataPengunjung.getIdData(), ticket);
                return new ResponseEntity<>(new CustomSuccessType("Parking out success"), HttpStatus.OK);
            }
        }
    }
}
