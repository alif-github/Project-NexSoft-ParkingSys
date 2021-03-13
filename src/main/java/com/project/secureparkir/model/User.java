package com.project.secureparkir.model;

import javax.validation.constraints.*;

public class User {

    private String idUser;

    @NotNull(message = "nama user must be fill in")
    @NotEmpty(message = "nama user must be fill in")
    private String namaUser;

    @NotNull(message = "email must be fill in")
    @NotEmpty(message = "email must be fill in")
    @Email(message = "format email false, use 'example@gmail.com'")
    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{0,}$" , message = "format email false, use 'example@gmail.com'")
    private String email;

    @NotNull(message = "username must be fill in")
    @NotEmpty(message = "username must be fill in")
    private String username;

    @NotNull(message = "password must be fill in")
    @Size(min = 6 , max = 8 , message = "password fill between 6 - 8 character")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,8}$" ,
            message = "password minimal 6 character, maximal 8 character with at least 1 Uppercase font, 1 Lowecase font, and 1 number")
    private String password;

    @NotNull(message = "address must be fill in")
    @NotEmpty(message = "address must be fill in")
    private String alamat;

    private Boolean status;

    private String tglRegister;

    private int idPosisi;

    private String posisi;

    public User(String idUser, String namaUser, String email, String username,
                String password, String alamat, Boolean status, String tglRegister, int idPosisi) {
        this.idUser = idUser;
        this.namaUser = namaUser;
        this.email = email;
        this.username = username;
        this.password = password;
        this.alamat = alamat;
        this.status = status;
        this.tglRegister = tglRegister;
        this.idPosisi = idPosisi;
    }

    public User(String idUser, String namaUser, String email, String username,
                String password, String alamat, Boolean status, String tglRegister, int idPosisi, String posisi) {
        this.idUser = idUser;
        this.namaUser = namaUser;
        this.email = email;
        this.username = username;
        this.password = password;
        this.alamat = alamat;
        this.status = status;
        this.tglRegister = tglRegister;
        this.idPosisi = idPosisi;
        this.posisi = posisi;
    }

    public User() {

    }

    public String getIdUser() {
        return idUser;
    }

    public void setIdUser(String idUser) {
        this.idUser = idUser;
    }

    public String getNamaUser() {
        return namaUser;
    }

    public void setNamaUser(String namaUser) {
        this.namaUser = namaUser;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public String getPosisi() {
        return posisi;
    }

    public void setPosisi(String posisi) {
        this.posisi = posisi;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public int getIdPosisi() {
        return idPosisi;
    }

    public void setIdPosisi(int idPosisi) {
        this.idPosisi = idPosisi;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getTglRegister() {
        return tglRegister;
    }

    public void setTglRegister(String tglRegister) {
        this.tglRegister = tglRegister;
    }

    @Override
    public String toString() {
        return "User{" +
                "idUser='" + idUser + '\'' +
                ", namaUser='" + namaUser + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", alamat='" + alamat + '\'' +
                ", status=" + status +
                ", tglRegister='" + tglRegister + '\'' +
                ", idPosisi=" + idPosisi +
                ", posisi=" + posisi +
                '}';
    }
}
