package BugTrackerProject.BugTracker;

import java.awt.Button;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.GridLayout;
import java.awt.Label;
import java.awt.TextField;

import javax.swing.ButtonGroup;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

public class MainGUI {

	public static void main(String[] args) {
		Frame F = new Frame("Add To Database");
		GridLayout GL = new GridLayout(6,7);
		F.setLayout(GL);
		
		TextField IDInput = new TextField(10);
		
		// FRIEND: Finish Making TextAreas Functional
		JTextArea DescriptionInput = new JTextArea();
		JScrollPane scrollPane = new JScrollPane(DescriptionInput);
		DescriptionInput.setLineWrap(true);
		DescriptionInput.setWrapStyleWord(true);
		scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_ALWAYS);
		scrollPane.setPreferredSize(new Dimension(50, 50));
		
		TextField StatusInput = new TextField(15);
		
		JPanel RBPanel = new JPanel();
		GridLayout RBGrid = new GridLayout(2,2);
		RBPanel.setLayout(RBGrid);
		JRadioButton LowRB = new JRadioButton("Low",true);
		JRadioButton MediumRB = new JRadioButton("Medium");
		JRadioButton HighRB = new JRadioButton("High");
		JRadioButton CriticalRB = new JRadioButton("Critical");
		ButtonGroup PriorityButtons = new ButtonGroup();
		PriorityButtons.add(LowRB);
		PriorityButtons.add(MediumRB);
		PriorityButtons.add(HighRB);
		PriorityButtons.add(CriticalRB);
		RBPanel.add(LowRB);
		RBPanel.add(MediumRB);
		RBPanel.add(HighRB);
		RBPanel.add(CriticalRB);
				
		TextField TagOneInput = new TextField(20);
		TextField TagTwoInput = new TextField(20);
		TextField TagThreeInput = new TextField(20);
		TextField ImageLinkInput = new TextField(50);
		TextField CloseReasonInput = new TextField(250);
		TextField OpenReasonInput = new TextField(250);
		
		Label IDLbl = new Label("BugID:");
		Label DescriptionLbl = new Label("Description:");
		Label StatusLbl = new Label("Status:");
		Label PriorityLbl = new Label("Priority:");
		Label TagOneLbl = new Label("Tag One:");
		Label TagTwoLbl = new Label("Tag Two:");
		Label TagThreeLbl = new Label("Tag Three:");
		Label ImageLinkLbl = new Label("Image Link:");
		Label CloseReasonLbl = new Label("Reason For Closing:");
		Label OpenReasonLbl = new Label("Reason For Reopening:");
		
		EHandlers EHandl = new EHandlers(IDInput, DescriptionInput, StatusInput, LowRB, MediumRB, HighRB, CriticalRB,
				TagOneInput, TagTwoInput, TagThreeInput, ImageLinkInput, CloseReasonInput,
				OpenReasonInput);
		Button addButton = new Button("Add To Database");
		addButton.addActionListener(EHandl);

		F.add(IDLbl);
		F.add(IDInput);	
		F.add(TagOneLbl);
		F.add(TagOneInput);	
		F.add(DescriptionLbl);
		F.add(DescriptionInput);	
		F.add(TagTwoLbl);
		F.add(TagTwoInput);
		F.add(StatusLbl);
		F.add(StatusInput);
		F.add(TagThreeLbl);
		F.add(TagThreeInput);
		F.add(PriorityLbl);
		F.add(RBPanel);		
		F.add(CloseReasonLbl);
		F.add(CloseReasonInput);
		F.add(ImageLinkLbl);
		F.add(ImageLinkInput);
		F.add(OpenReasonLbl);
		F.add(OpenReasonInput);
		
		F.add(new Label(""));
		F.add(new Label(""));
		F.add(new Label(""));
		F.add(addButton);
		
		F.setSize(750,250);
		F.setVisible(true);
	}

}