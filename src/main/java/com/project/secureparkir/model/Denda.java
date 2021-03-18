package com.project.secureparkir.model;

public class Denda {
    private int idDenda;
    private String denda;
    private double jumlahDenda;

    public Denda(int idDenda, String denda, double jumlahDenda) {
        this.idDenda = idDenda;
        this.denda = denda;
        this.jumlahDenda = jumlahDenda;
    }

    public int getIdDenda() {
        return idDenda;
    }

    public void setIdDenda(int idDenda) {
        this.idDenda = idDenda;
    }

    public String getDenda() {
        return denda;
    }

    public void setDenda(String denda) {
        this.denda = denda;
    }

    public double getJumlahDenda() {
        return jumlahDenda;
    }

    public void setJumlahDenda(double jumlahDenda) {
        this.jumlahDenda = jumlahDenda;
    }

    @Override
    public String toString() {
        return "Denda{" +
                "idDenda=" + idDenda +
                ", denda='" + denda + '\'' +
                ", jumlahDenda=" + jumlahDenda +
                '}';
    }
}
