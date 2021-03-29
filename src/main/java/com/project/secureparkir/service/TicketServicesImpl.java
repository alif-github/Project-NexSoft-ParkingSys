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
    public Ticket findLastIdWithParams(String id) {
        Ticket ticket;
        try {
            ticket = ticketRepository.findLastIdWithParams(id);
        } catch (Exception e) {
            ticket = null;
        }
        return ticket;
    }

    @Override
    public Ticket findLastNoPolWithParams(String noPol) {
        Ticket ticket;
        try {
            ticket = ticketRepository.findLastNoPolWithParams(noPol);
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
    public void exitTicketNormal(String idData, Ticket ticket) {
        synchronized (this) {
            ticketRepository.exitTicketNormal(idData, ticket);
        }
    }

    @Override
    public void exitTicketDenda(String idData, String id, Ticket ticket) {
        synchronized (this) {
            ticketRepository.exitTicketDenda(idData, id, ticket);
        }
    }

    @Override
    public void updateTicket(String idData, Double jumlahDenda, Ticket ticket) {
        synchronized (this) {
            ticketRepository.updateTicket(idData, jumlahDenda, ticket);
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
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("tglJamMasuk") && !String.valueOf(params.get("tglJamMasuk")).isBlank()) {
                String tglAwalMasuk = ""+params.get("tglJamMasuk")+" 00:00:01";
                String tglAkhirMasuk = ""+params.get("tglJamMasuk")+" 23:59:59";
                whereQuery.add("tglJamMasuk between '"+tglAwalMasuk+"' and '"+tglAkhirMasuk+"' order by tglJamMasuk desc");
            }
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamKeluar between '"+tglAwal+"' and '"+tglAkhir+"' order by tglJamKeluar desc");
            }

            if (params.containsKey("limit") && !String.valueOf(params.get("limit")).isBlank())
                pageQuery.add(" LIMIT "+params.get("limit"));
            if (params.containsKey("offset") && !String.valueOf(params.get("offset")).isBlank())
                pageQuery.add(" OFFSET "+params.get("offset"));

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);
            if (!pageQuery.isEmpty()) {
                pagging += String.join(" ", pageQuery);
            }
            return ticketRepository.readDataByQuery(query,pagging);
        }
    }

    @Override
    public int countAllDataByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("tglJamMasuk") && !String.valueOf(params.get("tglJamMasuk")).isBlank()) {
                String tglAwalMasuk = ""+params.get("tglJamMasuk")+" 00:00:01";
                String tglAkhirMasuk = ""+params.get("tglJamMasuk")+" 23:59:59";
                whereQuery.add("tglJamMasuk between '"+tglAwalMasuk+"' and '"+tglAkhirMasuk+"' order by tglJamMasuk desc");
            }
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamKeluar between '"+tglAwal+"' and '"+tglAkhir+"' order by tglJamKeluar desc");
            }

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return ticketRepository.countAllDataByQuery(query);
        }
    }

    @Override
    public int countInByQuery(Map <Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("tglJamMasuk") && !String.valueOf(params.get("tglJamMasuk")).isBlank()) {
                String tglAwalMasuk = ""+params.get("tglJamMasuk")+" 00:00:01";
                String tglAkhirMasuk = ""+params.get("tglJamMasuk")+" 23:59:59";
                whereQuery.add("tglJamMasuk between '"+tglAwalMasuk+"' and '"+tglAkhirMasuk+"' order by tglJamMasuk desc");
            }
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamMasuk between '"+tglAwal+"' and '"+tglAkhir+"' order by tglJamMasuk desc");
            }

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return ticketRepository.countInByQuery(query);
        }
    }

    @Override
    public int countOutByQuery(Map <Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamKeluar between '"+tglAwal+"' and '"+tglAkhir+"' order by tglJamKeluar desc");
            }

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return ticketRepository.countOutByQuery(query);
        }
    }

    @Override
    public int countInCarByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("tglJamMasuk") && !String.valueOf(params.get("tglJamMasuk")).isBlank()) {
                String tglAwalMasuk = ""+params.get("tglJamMasuk")+" 00:00:01";
                String tglAkhirMasuk = ""+params.get("tglJamMasuk")+" 23:59:59";
                whereQuery.add("tglJamMasuk between '"+tglAwalMasuk+"' and '"+tglAkhirMasuk+"' and idJenis = 2 order by tglJamMasuk desc");
            }
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamMasuk between '"+tglAwal+"' and '"+tglAkhir+"' and idJenis = 2 order by tglJamMasuk desc");
            }

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return ticketRepository.countInCarByQuery(query);
        }
    }

    @Override
    public int countInMotorCycleByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("tglJamMasuk") && !String.valueOf(params.get("tglJamMasuk")).isBlank()) {
                String tglAwalMasuk = ""+params.get("tglJamMasuk")+" 00:00:01";
                String tglAkhirMasuk = ""+params.get("tglJamMasuk")+" 23:59:59";
                whereQuery.add("tglJamMasuk between '"+tglAwalMasuk+"' and '"+tglAkhirMasuk+"' and idJenis = 1 order by tglJamMasuk desc");
            }
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamMasuk between '"+tglAwal+"' and '"+tglAkhir+"' and idJenis = 1 order by tglJamMasuk desc");
            }

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return ticketRepository.countInMotorCycleByQuery(query);
        }
    }

    @Override
    public int countOutCarByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamKeluar between '"+tglAwal+"' and '"+tglAkhir+"' and idJenis = 2 order by tglJamKeluar desc");
            }

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return ticketRepository.countOutCarByQuery(query);
        }
    }

    @Override
    public int countOutMotorCycleByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamKeluar between '"+tglAwal+"' and '"+tglAkhir+"' and idJenis = 1 order by tglJamKeluar desc");
            }

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return ticketRepository.countOutMotorCycleByQuery(query);
        }
    }

    @Override
    public Double sumAllDataByQuery(Map <Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamKeluar between '"+tglAwal+"' and '"+tglAkhir+"' order by tglJamKeluar desc");
            }

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return ticketRepository.sumAllDataByQuery(query);
        }
    }

    @Override
    public Double sumBiayaParkirByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamKeluar between '"+tglAwal+"' and '"+tglAkhir+"' and id not like '%MEMBER-%' order by tglJamKeluar desc");
            }

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return ticketRepository.sumBiayaParkirByQuery(query);
        }
    }

    @Override
    public Double sumDendaParkirByQuery(Map<Object, Object> params) {
        synchronized (this) {
            String query = "";

            ArrayList<String> whereQuery = new ArrayList<>();

            if (params.containsKey("idData") && !String.valueOf(params.get("idData")).isBlank())
                whereQuery.add("idData='"+params.get("idData")+"'");
            if (params.containsKey("id") && !String.valueOf(params.get("id")).isBlank())
                whereQuery.add("id='"+params.get("id")+"'");
            if (params.containsKey("noPol") && !String.valueOf(params.get("noPol")).isBlank())
                whereQuery.add("noPol='"+params.get("noPol")+"'");
            if (params.containsKey("namaStaff") && !String.valueOf(params.get("namaStaff")).isBlank())
                whereQuery.add("namaStaff='"+params.get("namaStaff")+"'");
            if (params.containsKey("staffOut") && !String.valueOf(params.get("staffOut")).isBlank())
                whereQuery.add("staffOut='"+params.get("staffOut")+"'");
            if (params.containsKey("dateTime") && !String.valueOf(params.get("dateTime")).isBlank()) {
                String tglAwal = ""+params.get("dateTime")+" 00:00:01";
                String tglAkhir = ""+params.get("dateTime")+" 23:59:59";
                whereQuery.add("tglJamKeluar between '"+tglAwal+"' and '"+tglAkhir+"' order by tglJamKeluar desc");
            }

            if (!whereQuery.isEmpty())
                query += "WHERE " + String.join(" AND ", whereQuery);

            return ticketRepository.sumDendaParkirByQuery(query);
        }
    }
}
