package com.project.secureparkir.model;

public class Posisi {
    private String idPosisi;
    private String posisi;

    public Posisi(String idPosisi, String posisi) {
        this.idPosisi = idPosisi;
        this.posisi = posisi;
    }

    public String getIdPosisi() {
        return idPosisi;
    }

    public void setIdPosisi(String idPosisi) {
        this.idPosisi = idPosisi;
    }

    public String getPosisi() {
        return posisi;
    }

    public void setPosisi(String posisi) {
        this.posisi = posisi;
    }

    @Override
    public String toString() {
        return "Posisi{" +
                "idPosisi='" + idPosisi + '\'' +
                ", posisi='" + posisi + '\'' +
                '}';
    }
}
