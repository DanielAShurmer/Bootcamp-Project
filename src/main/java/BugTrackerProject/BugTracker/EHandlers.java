package BugTrackerProject.BugTracker;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.swing.JRadioButton;
import javax.swing.JTextArea;

public class EHandlers implements ActionListener{
	TextField InputID, InputStat, InputTagOne, InputTagTwo, 
	  InputTagThree, InputImg, InputClose, InputOpen;
	JTextArea InputDesc;
	JRadioButton InputPriorLow, InputPriorMid, InputPriorHgh, InputPriorCrt;
	Connection conn = null;
	Statement stat = null;
	
	public EHandlers(TextField A, JTextArea B, TextField C, 
			JRadioButton DA, JRadioButton DB, JRadioButton DC, JRadioButton DD,
			TextField E, TextField F, TextField G, TextField H, TextField I, TextField J){
		InputID = A;
		InputDesc = B;
		InputStat = C;
		InputPriorLow = DA;
		InputPriorMid = DB;
		InputPriorHgh = DC;
		InputPriorCrt = DD;
		InputTagOne = E;
		InputTagTwo = F;
		InputTagThree = G;
		InputImg = H;
		InputClose = I;
		InputOpen = J;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/BugTracker?useLegacyDatetimeCode="
					+ "false&serverTimezone=Europe/London","root","password");
			stat = conn.createStatement();
		}
		catch(Exception Ex) {
			System.out.println(Ex.toString());
		}
	}
	
	public void actionPerformed(ActionEvent Trigger) {	
		String ID, Desc, Stat, Prior, TagOne, TagTwo, TagThree, Img, Close, Open; 
		String insertQuery="";
		ID = InputID.getText();
		Desc = InputDesc.getText();
		Stat = InputStat.getText();
		Prior= "Low";
		
		if (InputPriorLow.isSelected()) {
			Prior = "Low";
		}
		if (InputPriorMid.isSelected()) {
			Prior = "Medium";
		}
		if (InputPriorHgh.isSelected()) {
			Prior = "High";
		}
		if (InputPriorCrt.isSelected()) {
			Prior = "Critical";
		}
		
		TagOne = InputTagOne.getText();
		TagTwo = InputTagTwo.getText();
		TagThree = InputTagThree.getText();
		Img = InputImg.getText();
		Close = InputClose.getText();
		Open = InputOpen.getText();
		insertQuery = "insert into Bugs values("+ID+",'"+Desc+"','"+Stat+"','"+Prior+"','"+TagOne+
				"','"+TagTwo+"','"+TagThree+"','"+Img+"','"+Close+"','"+Open+"')";
		System.out.println(insertQuery);
		try {        
			stat.executeUpdate(insertQuery);                
			}        
		catch(Exception Ex) {    
			System.out.println(Ex.toString());      
			}
	}
}