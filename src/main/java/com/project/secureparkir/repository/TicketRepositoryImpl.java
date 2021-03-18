package com.project.secureparkir.repository;

import com.project.secureparkir.model.Denda;
import com.project.secureparkir.model.JenisKendaraan;
import com.project.secureparkir.model.Member;
import com.project.secureparkir.model.Ticket;
import com.project.secureparkir.service.MemberServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.security.SecureRandom;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository("ticketRepository")
public class TicketRepositoryImpl implements TicketRepository {

    @Autowired
    JdbcTemplate databases; //connect to database

    @Autowired
    MemberServices memberServices;

    @Override
    public String generateRandomString(int length) {
        String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
        String CHAR_UPPER = CHAR_LOWER.toUpperCase();
        String NUMBER = "0123456789";

        String DATA_FOR_RANDOM_STRING = CHAR_LOWER + CHAR_UPPER + NUMBER;
        SecureRandom random = new SecureRandom();

        if (length < 1) throw new IllegalArgumentException();

        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            // 0-62 (exclusive), random returns 0-61
            int rndCharAt = random.nextInt(DATA_FOR_RANDOM_STRING.length());
            char rndChar = DATA_FOR_RANDOM_STRING.charAt(rndCharAt);

            sb.append(rndChar);
        }

        return sb.toString();
    }

    @Override
    public Ticket findLastId() {
        String querySql = "SELECT * FROM ticket ORDER BY tglJamMasuk DESC LIMIT 1";
        return databases.queryForObject(querySql,
                (rs, rowNum) ->
                        new Ticket(
                                rs.getString("idData"),
                                rs.getString("id"),
                                rs.getString("noPol"),
                                rs.getInt("idJenis"),
                                rs.getString("tglJamMasuk"),
                                rs.getString("tglJamKeluar"),
                                rs.getDouble("biayaParkir"),
                                rs.getInt("idDenda"),
                                rs.getString("namaStaff"),
                                rs.getDouble("nominal")
                        ));
    }

    @Override
    public Ticket findLastIdWithParams(String id) {
        String querySql = "SELECT * FROM ticket WHERE id='"+id+"' ORDER BY tglJamMasuk DESC LIMIT 1 ";
        Ticket ticket;
        ticket = databases.queryForObject(querySql,
                (rs, rowNum) ->
                        new Ticket(
                                rs.getString("idData"),
                                rs.getString("id"),
                                rs.getString("noPol"),
                                rs.getInt("idJenis"),
                                rs.getString("tglJamMasuk"),
                                rs.getString("tglJamKeluar"),
                                rs.getDouble("biayaParkir"),
                                rs.getInt("idDenda"),
                                rs.getString("namaStaff"),
                                rs.getDouble("nominal"),
                                null,
                                null
                        ));
        String sql1 = "SELECT * FROM denda WHERE idDenda=?";
        ticket.setDenda(databases.query(sql1,
                preparedStatement -> preparedStatement.setInt(1,ticket.getIdDenda()),
                (rs, rowNum) ->
                        new Denda(
                                rs.getInt("idDenda"),
                                rs.getString("denda"),
                                rs.getDouble("jumlahDenda")
                        )));
        String sql2 = "SELECT * FROM jeniskendaraan WHERE idJenis="+ticket.getIdJenis()+"";
        ticket.setJenisKendaraan(databases.query(sql2,
                (rs, rowNum) ->
                        new JenisKendaraan(
                                rs.getInt("idJenis"),
                                rs.getString("jenis"),
                                rs.getDouble("value"),
                                rs.getDouble("firstValue")
                        )));
        return ticket;
    }

    //Tiket masuk:::::::::::::::::::::::::::::::::::::>>>
    @Override
    public void createTicket(Boolean isMember, String idMember, Ticket ticket) {
        //---------------------------------------------------
        // Format ID untuk ticket
        //---------------------------------------------------

        if (isMember) {
            Member member = memberServices.findByIdMember(idMember);
            ticket.setId(idMember);
            ticket.setNoPol(member.getNoPol());
            ticket.setIdJenis(member.getIdJenis());
        } else {
            String idTicketTemp = generateRandomString(10);
            ticket.setId(idTicketTemp);
            ticket.setNoPol("-");
            ticket.setIdJenis(0);
        }

        //---------------------------------------------------
        Date date = new Date();
        Timestamp ts = new Timestamp(date.getTime());
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //---------------------------------------------------
        ticket.setIdData(UUID.randomUUID().toString());
        ticket.setTglJamMasuk(formatter.format(ts));
        ticket.setTglJamKeluar("-");
        ticket.setBiayaParkir(0);
        ticket.setIdDenda(0);
        ticket.setNominal(0);
        ticket.setIdDenda(3);
        //---------------------------------------------------

        String sql = "INSERT INTO ticket(idData, id,noPol,idJenis,tglJamMasuk,tglJamKeluar,biayaParkir,idDenda,namaStaff,nominal)" +
                "VALUES(?,?,?,?,?,?,?,?,?,?)";
        databases.update(sql,
                ticket.getIdData(),
                ticket.getId(),
                ticket.getNoPol(),
                ticket.getIdJenis(),
                ticket.getTglJamMasuk(),
                ticket.getTglJamKeluar(),
                ticket.getBiayaParkir(),
                ticket.getIdDenda(),
                ticket.getNamaStaff(),
                ticket.getNominal());
    }

    @Override
    public List<Ticket> findById(String id) {
        List<Ticket> ticket;
        String sql = "SELECT * FROM ticket WHERE id='"+id+"'";
        ticket = databases.query(sql,
                (rs, rowNum) ->
                new Ticket(
                        rs.getString("idData"),
                        rs.getString("id"),
                        rs.getString("noPol"),
                        rs.getInt("idJenis"),
                        rs.getString("tglJamMasuk"),
                        rs.getString("tglJamKeluar"),
                        rs.getDouble("biayaParkir"),
                        rs.getInt("idDenda"),
                        rs.getString("namaStaff"),
                        rs.getDouble("nominal"),
                        null,
                        null
                ));
        for (Ticket tc : ticket) {
            String sql1 = "SELECT * FROM denda WHERE idDenda=?";
            tc.setDenda(databases.query(sql1,
                    preparedStatement -> preparedStatement.setInt(1,tc.getIdDenda()),
                    (rs, rowNum) ->
                            new Denda(
                                    rs.getInt("idDenda"),
                                    rs.getString("denda"),
                                    rs.getDouble("jumlahDenda")
                            )));
            String sql2 = "SELECT * FROM jeniskendaraan WHERE idJenis="+tc.getIdJenis()+"";
            tc.setJenisKendaraan(databases.query(sql2,
                    (rs, rowNum) ->
                            new JenisKendaraan(
                                    rs.getInt("idJenis"),
                                    rs.getString("jenis"),
                                    rs.getDouble("value"),
                                    rs.getDouble("firstValue")
                            )));
        }
        return ticket;
    }

    @Override
    public void exitTicket(Boolean isMember, String id, Ticket ticket) {
        //keluar bisa masukin id atau masukin no plat
        String sqlUpdateMember = "UPDATE ticket SET tglJamKeluar = ? WHERE idData = ?";
        String sqlUpdateReguler = "UPDATE ticket SET noPol = ? , idJenis = ? , tglJamKeluar = ? WHERE idData = ?";

        //---------------------------------------------------
        Date date = new Date();
        Timestamp ts = new Timestamp(date.getTime());
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //---------------------------------------------------
        ticket.setTglJamKeluar(formatter.format(ts));

        if (isMember) {
            databases.update(sqlUpdateMember,
                    ticket.getTglJamKeluar(),
                    id);
        } else {
            databases.update(sqlUpdateReguler,
                    ticket.getNoPol(),
                    ticket.getIdJenis(),
                    ticket.getTglJamKeluar(),
                    id);
        }
    }

    @Override
    public List<Ticket> readDataByQuery(String query, String pagging) {
        List<Ticket> ticket;
        String sql = "SELECT * FROM ticket "+query+" "+pagging+"";
        ticket = databases.query(sql,
                (rs, rowNum) ->
                        new Ticket(
                                rs.getString("idData"),
                                rs.getString("id"),
                                rs.getString("noPol"),
                                rs.getInt("idJenis"),
                                rs.getString("tglJamMasuk"),
                                rs.getString("tglJamKeluar"),
                                rs.getDouble("biayaParkir"),
                                rs.getInt("idDenda"),
                                rs.getString("namaStaff"),
                                rs.getDouble("nominal"),
                                null,
                                null
                        ));
        for (Ticket tc : ticket) {
            String sql1 = "SELECT * FROM denda WHERE idDenda=?";
            tc.setDenda(databases.query(sql1,
                    preparedStatement -> preparedStatement.setInt(1,tc.getIdDenda()),
                    (rs, rowNum) ->
                            new Denda(
                                    rs.getInt("idDenda"),
                                    rs.getString("denda"),
                                    rs.getDouble("jumlahDenda")
                            )));
            String sql2 = "SELECT * FROM jeniskendaraan WHERE idJenis="+tc.getIdJenis()+"";
            tc.setJenisKendaraan(databases.query(sql2,
                    (rs, rowNum) ->
                            new JenisKendaraan(
                                    rs.getInt("idJenis"),
                                    rs.getString("jenis"),
                                    rs.getDouble("value"),
                                    rs.getDouble("firstValue")
                            )));
        }
        return ticket;
    }
}
