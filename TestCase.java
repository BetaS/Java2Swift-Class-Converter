package com.example;

import test;

public class Tester extends ABC implements BCD, EFG {
    public static int test = 1;
    public static final float SAMPLE = 1.1;
    protected boolean check = false;
    int test;
    public String check;
	private int abc = 123;
	private String bcd;
	
	public Tester(int abc, String bcd) {
		this.abc = abc;
		this.bcd = null;
	}
	Tester() {
	}

    private Tester() throws test {
    }

    public static int getStatic() throws TEST {
        return 1;
    }

	public int getABC() {
		return abc;
	}
	public String getBCD(int a) {
		return bcd;
	}
	private void rtn() {
	}
}