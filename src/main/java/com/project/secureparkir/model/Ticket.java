package com.project.secureparkir.model;

import java.util.List;

public class Ticket {
    private String idData;
    private String id;
    private String noPol;
    private int idJenis;
    private String tglJamMasuk;
    private String tglJamKeluar;
    private double biayaParkir;
    private int idDenda;
    private String namaStaff;
    private double nominal;

    //Join Table.
    List<Denda> denda;
    List<JenisKendaraan> jenisKendaraan;


    public Ticket(String idData, String id, String noPol, int idJenis, String tglJamMasuk,
                  String tglJamKeluar, double biayaParkir, int idDenda,
                  String namaStaff, double nominal) {
        this.idData = idData;
        this.id = id;
        this.noPol = noPol;
        this.idJenis = idJenis;
        this.tglJamMasuk = tglJamMasuk;
        this.tglJamKeluar = tglJamKeluar;
        this.biayaParkir = biayaParkir;
        this.idDenda = idDenda;
        this.namaStaff = namaStaff;
        this.nominal = nominal;
    }

    public Ticket(String idData, String id, String noPol, int idJenis, String tglJamMasuk, String tglJamKeluar,
                  double biayaParkir, int idDenda, String namaStaff, double nominal,
                  List<Denda> denda, List<JenisKendaraan> jenisKendaraan) {
        this.idData = idData;
        this.id = id;
        this.noPol = noPol;
        this.idJenis = idJenis;
        this.tglJamMasuk = tglJamMasuk;
        this.tglJamKeluar = tglJamKeluar;
        this.biayaParkir = biayaParkir;
        this.idDenda = idDenda;
        this.namaStaff = namaStaff;
        this.nominal = nominal;
        this.denda = denda;
        this.jenisKendaraan = jenisKendaraan;
    }

    public Ticket() {

    }

    public String getIdData() {
        return idData;
    }

    public void setIdData(String idData) {
        this.idData = idData;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNoPol() {
        return noPol;
    }

    public void setNoPol(String noPol) {
        this.noPol = noPol;
    }

    public int getIdJenis() {
        return idJenis;
    }

    public void setIdJenis(int idJenis) {
        this.idJenis = idJenis;
    }

    public String getTglJamMasuk() {
        return tglJamMasuk;
    }

    public void setTglJamMasuk(String tglJamMasuk) {
        this.tglJamMasuk = tglJamMasuk;
    }

    public String getTglJamKeluar() {
        return tglJamKeluar;
    }

    public void setTglJamKeluar(String tglJamKeluar) {
        this.tglJamKeluar = tglJamKeluar;
    }

    public double getBiayaParkir() {
        return biayaParkir;
    }

    public void setBiayaParkir(double biayaParkir) {
        this.biayaParkir = biayaParkir;
    }

    public int getIdDenda() {
        return idDenda;
    }

    public void setIdDenda(int idDenda) {
        this.idDenda = idDenda;
    }

    public String getNamaStaff() {
        return namaStaff;
    }

    public void setNamaStaff(String namaStaff) {
        this.namaStaff = namaStaff;
    }

    public double getNominal() {
        return nominal;
    }

    public void setNominal(double nominal) {
        this.nominal = nominal;
    }

    public List<Denda> getDenda() {
        return denda;
    }

    public void setDenda(List<Denda> denda) {
        this.denda = denda;
    }

    public List<JenisKendaraan> getJenisKendaraan() {
        return jenisKendaraan;
    }

    public void setJenisKendaraan(List<JenisKendaraan> jenisKendaraan) {
        this.jenisKendaraan = jenisKendaraan;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "idData='" + idData + '\'' +
                ", id='" + id + '\'' +
                ", noPol='" + noPol + '\'' +
                ", idJenis=" + idJenis +
                ", tglJamMasuk='" + tglJamMasuk + '\'' +
                ", tglJamKeluar='" + tglJamKeluar + '\'' +
                ", biayaParkir=" + biayaParkir +
                ", idDenda=" + idDenda +
                ", namaStaff='" + namaStaff + '\'' +
                ", nominal=" + nominal +
                ", denda=" + denda +
                ", jenisKendaraan=" + jenisKendaraan +
                '}';
    }
}
