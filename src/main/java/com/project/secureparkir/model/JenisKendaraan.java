package com.project.secureparkir.model;

public class JenisKendaraan {

    private int idJenis;
    private String jenis;
    private double value;
    private double firstValue;

    public JenisKendaraan(int idJenis, String jenis, double value, double firstValue) {
        this.idJenis = idJenis;
        this.jenis = jenis;
        this.value = value;
        this.firstValue = firstValue;
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

    public double getFirstValue() {
        return firstValue;
    }

    public void setFirstValue(double firstValue) {
        this.firstValue = firstValue;
    }

    @Override
    public String toString() {
        return "JenisKendaraan{" +
                "idJenis=" + idJenis +
                ", jenis='" + jenis + '\'' +
                ", value=" + value +
                ", firstValue=" + firstValue +
                '}';
    }
}
