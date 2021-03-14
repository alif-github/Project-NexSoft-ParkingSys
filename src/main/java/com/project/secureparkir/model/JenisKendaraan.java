package com.project.secureparkir.model;

public class JenisKendaraan {

    private int idJenis;
    private String jenis;
    private double value;

    public JenisKendaraan(int idJenis, String jenis, double value) {
        this.idJenis = idJenis;
        this.jenis = jenis;
        this.value = value;
    }

    public int getIdJenis() {
        return idJenis;
    }

    public void setIdJenis(int idJenis) {
        this.idJenis = idJenis;
    }

    public String getJenis() {
        return jenis;
    }

    public void setJenis(String jenis) {
        this.jenis = jenis;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "JenisKendaraan{" +
                "idJenis=" + idJenis +
                ", jenis='" + jenis + '\'' +
                ", value=" + value +
                '}';
    }
}
