package com.project.secureparkir.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class Member {

    private String idMember;

    @Pattern(regexp = "^[a-zA-Z\\s\\.]*$",
            message = "Don't input number in name field")
    @NotNull(message = "name member must be fill in")
    @NotEmpty(message = "name member must be fill in")
    @Size(max = 50, message = "Maximum length 50 words")
    private String namaMember;

    private String tglRegister;

    private Boolean status;

    @Pattern(regexp = "^([A-Z]{1,2})(\\s|-)*([1-9][0-9]{0,3})(\\s|-)*([A-Z]{0,3}|[1-9][0-9]{1,2})$",
            message = "Not police number format, please check again.")
    @NotNull(message = "Police number must be fill in")
    @NotEmpty(message = "Police number must be fill in")
    private String noPol;

    private int idJenis;

    @Pattern(regexp = "^[a-zA-Z\\s\\.]*$",
            message = "Don't input number in name field")
    @NotNull(message = "name must be fill in")
    @NotEmpty(message = "name must be fill in")
    private String dibuatOleh;

    @Pattern(regexp = "^[a-zA-Z\\s\\-\\.]*$",
            message = "Don't input number in name field")
    private String dieditOleh;

    private String tglEdit;

    private double biayaMember;

    private String jenis;

    private double value;

    public Member(String idMember, String namaMember, String tglRegister, Boolean status, String noPol,
                  int idJenis, String dibuatOleh, String dieditOleh, String tglEdit, double biayaMember) {
        this.idMember = idMember;
        this.namaMember = namaMember;
        this.tglRegister = tglRegister;
        this.status = status;
        this.noPol = noPol;
        this.idJenis = idJenis;
        this.dibuatOleh = dibuatOleh;
        this.dieditOleh = dieditOleh;
        this.tglEdit = tglEdit;
        this.biayaMember = biayaMember;
    }

    public Member(String idMember, String namaMember, String tglRegister, Boolean status, String noPol,
                  int idJenis, String dibuatOleh, String dieditOleh, String tglEdit, double biayaMember, String jenis, double value) {
        this.idMember = idMember;
        this.namaMember = namaMember;
        this.tglRegister = tglRegister;
        this.status = status;
        this.noPol = noPol;
        this.idJenis = idJenis;
        this.dibuatOleh = dibuatOleh;
        this.dieditOleh = dieditOleh;
        this.tglEdit = tglEdit;
        this.biayaMember = biayaMember;
        this.jenis = jenis;
        this.value = value;
    }

    public Member(){

    }

    public String getIdMember() {
        return idMember;
    }

    public void setIdMember(String idMember) {
        this.idMember = idMember;
    }

    public String getNamaMember() {
        return namaMember;
    }

    public void setNamaMember(String namaMember) {
        this.namaMember = namaMember;
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

    public String getTglRegister() {
        return tglRegister;
    }

    public void setTglRegister(String tglRegister) {
        this.tglRegister = tglRegister;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getDibuatOleh() {
        return dibuatOleh;
    }

    public void setDibuatOleh(String dibuatOleh) {
        this.dibuatOleh = dibuatOleh;
    }

    public String getDieditOleh() {
        return dieditOleh;
    }

    public double getBiayaMember() {
        return biayaMember;
    }

    public void setBiayaMember(double biayaMember) {
        this.biayaMember = biayaMember;
    }

    public void setDieditOleh(String dieditOleh) {
        this.dieditOleh = dieditOleh;
    }

    public String getTglEdit() {
        return tglEdit;
    }

    public void setTglEdit(String tglEdit) {
        this.tglEdit = tglEdit;
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
        return "Member{" +
                "idMember='" + idMember + '\'' +
                ", namaMember='" + namaMember + '\'' +
                ", tglRegister='" + tglRegister + '\'' +
                ", status=" + status +
                ", noPol='" + noPol + '\'' +
                ", idJenis=" + idJenis +
                ", dibuatOleh='" + dibuatOleh + '\'' +
                ", dieditOleh='" + dieditOleh + '\'' +
                ", tglEdit='" + tglEdit + '\'' +
                ", biayaMember=" + biayaMember +
                ", jenis='" + jenis + '\'' +
                ", value=" + value +
                '}';
    }
}
