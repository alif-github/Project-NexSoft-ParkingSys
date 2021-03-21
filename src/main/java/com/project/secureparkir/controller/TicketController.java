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
import org.springframework.dao.DataAccessException;
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

    //Read Data By Ticket-ok
    @GetMapping("/read-ticket/")
    public ResponseEntity<?> getData(@RequestParam Map<Object, Object> params) {
        List<Ticket> ticketList;
        Map<String, Object> output = new HashMap<>();

        try {
            ticketList = ticketServices.readDataByQuery(params);
            output.put("data",ticketList);
            return new ResponseEntity<>(output, HttpStatus.OK);
        } catch (DataAccessException e) {
            return new ResponseEntity<>(new CustomErrorType("Failed to fetching data"), HttpStatus.BAD_GATEWAY);
        }
    }

    @PutMapping("/parkir-out/")
    public ResponseEntity<?> parkingOut(@RequestParam("id") String id, @RequestBody Ticket ticket) {
        logger.info("Update for exit");
        Ticket dataPengunjung = ticketServices.findLastIdWithParams(id);
        Map<String, Object> output = new HashMap<>();

        if (dataPengunjung.getTglJamKeluar().equalsIgnoreCase("-")) {
            if (dataPengunjung == null) {
                //data member tidak ditemukan
                return new ResponseEntity<>(new CustomErrorType("Parking out failed"), HttpStatus.BAD_REQUEST);
            } else {
                //data member ditemukan
                ticketServices.exitTicket(dataPengunjung.getIdData(), ticket);
                output.put("id", dataPengunjung.getIdData());
                output.put("message", new CustomSuccessType("Parking out success"));
                return new ResponseEntity<>(output, HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<>(new CustomErrorType("Parking out failed"), HttpStatus.BAD_REQUEST);
        }
    }

    //Update Ticket-ok
    @PutMapping("/update/")
    public ResponseEntity<?> updateSingleTicketNormal(@RequestParam("idData") String idData, @RequestBody Ticket ticket) {
        logger.info("Update Data");

        Map<Object, Object> input = new HashMap<>();
        input.put("idData",idData);

        List<Ticket> ticketList = ticketServices.readDataByQuery(input);

        if (ticketList.isEmpty()) {
            return new ResponseEntity<>(new CustomErrorType("Data not found"), HttpStatus.OK);
        } else {
            try {
                ticketServices.updateTicket(idData, ticketList.get(0).getDenda().get(0).getJumlahDenda(), ticket);
                return new ResponseEntity<>(new CustomSuccessType("Update Success"), HttpStatus.OK);
            } catch(Exception e) {
                return new ResponseEntity<>(new CustomErrorType("Update Failed"), HttpStatus.BAD_REQUEST);
            }
        }
    }
}
