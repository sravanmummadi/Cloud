$(document).ready(function(){
	url="http://ec2-54-183-248-13.us-west-1.compute.amazonaws.com";
	 patientsArray=[];
	$("#HospitalCoverageBasedoncity_btn").click(function(){
		$('#HospitalCoverageBasedoncity').show();
		var cityvalue = $("#HospitalCoverageBasedoncity_input_city").val();
		if(cityvalue=="")
			{
			alert("Input City Name");
			return;
			}
		$.get(url+"/cgi_query_1.php",{"city":cityvalue},function(data,status){
			
			if(data=="0 results")
				{
				alert("Invalid Input OR "+data);
				return;
				}
			var jsondata = JSON.parse(data);
			var hospitalIdArray=[];
			var hospitalCoverageArray=[];
			var patientPersonalPayArray=[];
			
			for(i=0;i<jsondata.length;i++)
				{
				var obj = jsondata[i];
				hospitalIdArray.push(obj.NATIONAL_PROVIDER_ID);
				hospitalCoverageArray.push(obj.percentage);
				patientPersonalPayArray.push(100-obj.percentage);
				
				}
			
			 $('#HospitalCoverageBasedoncity').highcharts({
			        chart: {
			            type: 'column'
			        },
			        title: {
			            text: 'Personal Pay & Covered Through Insurance'
			        },
			        xAxis: {
			            categories: hospitalIdArray
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: ''
			            }
			        },
			        tooltip: {
			            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
			            shared: true
			        },
			        plotOptions: {
			            column: {
			                stacking: 'percent'
			            }
			        },
			        series: [ {
			            name: 'Personal Pay',
			            data: patientPersonalPayArray
			        },
			                {
			            name: 'Covered through Insurance',
			            data: hospitalCoverageArray
			        }]
			    });
			
		});
	});
	
	
	/*$("#DeathBasedonSymptom_btn").click(function(){
		var symptomvalue = $("#DeathBasedonSymptom_input_Symptom").val();
		if(symptomvalue=="")
			{
			alert("Input Symptom");
			return;
			}
		$.get("http://ec2-54-183-248-13.us-west-1.compute.amazonaws.com/cgi_query_2.php",{"symptom":symptomvalue},function(data,status){
			
			if(data=="0 results")
				{
				alert("Invalid Input OR "+data);
				return;
				}
			var jsondata = JSON.parse(data);
			var hospitalIdArray=[];
			var hospitalDeathArray=[];
			
			for(i=0;i<jsondata.length;i++)
				{
				var obj = jsondata[i];
				hospitalIdArray.push(obj.NATIONAL_PROVIDER_ID);
				hospitalDeathArray.push(obj.deaths);
				
				
				}
			
			 $('#DeathBasedonSymptom').highcharts({
			        chart: {
			            type: 'column'
			        },
			        title: {
			            text: 'Hospital vs Death'
			        },
			        xAxis: {
			            categories: hospitalIdArray
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: 'Total fruit consumption'
			            }
			        },
			        tooltip: {
			            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
			            shared: true
			        },
			        plotOptions: {
			            column: {
			                
			            }
			        },
			        series: [ {
			            name: 'Deaths',
			            data: hospitalDeathArray
			        }]
			    });
			
		});
	});
	*/
	
	$("#DeathBasedonSymptom_btn").click(function(){
		$("#DeathBasedonSymptom").show();
		var symptomvalue = $("#DeathBasedonSymptom_input_Symptom").val();
		if(symptomvalue=="")
			{
			alert("Input Symptom");
			return;
			}
		var cityvalue = $("#DeathBasedonSymptom_input_city").val();
		if(cityvalue=="")
			{
			obj ={"symptom":symptomvalue};
			}
		else
			{
			obj ={"symptom":symptomvalue,"city":cityvalue};
			}
		
		$.get(url+"/cgi_query_2_1.php",obj,function(data,status){
			
			if(data=="0 results")
				{
				alert("Invalid Input OR "+data);
				return;
				}
			var jsondata = JSON.parse(data);
			var hospitalIdArray=[];
			var hospitalDeathArray=[];
			
			for(i=0;i<jsondata.length;i++)
				{
				var obj = jsondata[i];
				var patients = obj.patients;
				for(j=0;j<patients.length;j++)
					{
					var id=patients[j].id;
					var tempArray=[];
					while(id==patients[j].id)
						{
						patients[j].y=parseInt(patients[j].LENGTH_OF_STAY); //y value = LENGTH_OF_STAY
						tempArray.push(patients[j]);
						
						j++;
						if(j==patients.length){
							//last element
							break;
						}
						}
					patientsArray.push({"id":id,"data":tempArray});
					}
				
				
				}
			
			options={
			        chart: {
			            type: 'column'
			        },
			        
			        events: {
		                drilldown: function (e) {
		                	debugger;
		                	/*
		                    if (!e.seriesOptions) {

		                        var chart = this,
		                            drilldowns = {
		                                'Animals': {
		                                    name: 'Animals',
		                                    data: [
		                                        ['Cows', 2],
		                                        ['Sheep', 3]
		                                    ]
		                                },
		                                'Fruits': {
		                                    name: 'Fruits',
		                                    data: [
		                                        ['Apples', 5],
		                                        ['Oranges', 7],
		                                        ['Bananas', 2]
		                                    ]
		                                },
		                                'Cars': {
		                                    name: 'Cars',
		                                    data: [
		                                        ['Toyota', 1],
		                                        ['Volkswagen', 2],
		                                        ['Opel', 5]
		                                    ]
		                                }
		                            },
		                            series = drilldowns[e.point.name];

		                        // Show the loading label
		                        chart.showLoading('Simulating Ajax ...');

		                        setTimeout(function () {
		                            chart.hideLoading();
		                            chart.addSeriesAsDrilldown(e.point, series);
		                        }, 1000);
		                    }*/

		                }
		            },
			        title: {
			            text: 'Hospitals having Patients with the Symptom'
			        },
			        subtitle: {
			            text: 'Click the columns to view get each Patient Record'
			        },
			        xAxis: {
			            type: 'category'
			        },
			        yAxis: {
			            title: {
			                text: 'Total Patients / Length Of Stay'
			            }

			        },
			        legend: {
			            enabled: false
			        },
			        plotOptions: {
			            series: {
			                borderWidth: 0,
			                dataLabels: {
			                    enabled: true,
			                    format: '{point.y:.1f}%'
			                }
			            }
			        },

			        tooltip: {
			            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
			            formatter: function() {
			            	
			            	if(this.series.name!="Hospitals")
			            		{
			            		//DrillDown Chart
			            		var temp = this.point.procedures;
			            		var procedures=[];
			            		var str= " Procedure Went Through : <br/>";
			            		for(var k=0 ; k<temp.length;k++)
			            			{
			            			if(temp[k]==" ")
			            				{
			            				
			            				}
			            			else
			            				{
			            				procedures.push(temp[k]);
			            				str=str+temp[k]+"<br/>       ";
			            				}
			            			}
			            		if(procedures.length==0)
			            			{
			            			str="";
			            			}
			            		
			            		
			            		
			            		return '<span style="color:'+this.point.color+'">'+this.point.name+'</span><br/>'+
			                    
			                    ' <b>'+'</b> Age : '+this.point.AGE+'<br/>'+
			                    ' <b>'+'</b> Sex : '+this.point.SEX+'<br/>'+
			                    ' <b>'+'</b> Race : '+this.point.RACE+'<br/>'+
			                    ' <b>'+'</b> Length of Stay : '+this.point.LENGTH_OF_STAY+'<br/>'+
			                    ' <b>'+'</b> Number of Procedures : '+procedures.length+'<br/>'+
			                    str;
			            		}
			            	else
			            		{
			            		//main chart
			            		return '<span style="font-size:11px">'+this.series.name+'</span>'+
			                    '<span style="color:'+this.point.color+'">'+this.point.name+'</span><br/>'+
			                    '<span style="color:'+this.point.color+'">'+this.point.deaths+'</span>'+' Deaths'+'<br/>'+
			                    ' <b>'+this.point.y+'</b> Total Patients<br/>'+
			                    ' <b>'+'</b> Mortality Probability = '+this.point.percentage*100+'%<br/>';
			            		}
			               
			            }
			        },

			        plotOptions: {
			            series: {
			                cursor: 'pointer',
			                point: {
			                    events: {
			                        click: function () {
			                           
			                        	//debugger;
			                        	//alert("clicked");
			                        }
			                    }
			                }
			            }
			        },
			        
			        series: [{
			            name: 'Hospitals',
			            colorByPoint: true,
			            data: jsondata/* [{
			                name: '1001234561',
			                y: 56.33,
			                drilldown: '1001234561'
			            },{
			                name: '1001234562',
			                y: 56.33,
			                drilldown: '1001234562'
			            },{
			                name: '1001234563',
			                y: 56.33,
			                drilldown: '1001234563'
			            },{
			                name: '1001234564',
			                y: 56.33,
			                drilldown: '1001234564'
			            },{
			                name: '1001234565',
			                y: 56.33,
			                drilldown: '1001234565'
			            },{
			                name: '1001234566',
			                y: 56.33,
			                drilldown: '1001234566'
			            },{
			                name: '1001234567',
			                y: 56.33,
			                drilldown: '1001234567'
			            },{
			                name: '1001234568',
			                y: 56.33,
			                drilldown: '1001234568'
			            },{
			                name: '1001234569',
			                y: 56.33,
			                drilldown: '1001234569'
			            },{
			                name: '1001234570',
			                y: 56.33,
			                drilldown: '1001234570'
			            }]*/
			        }],
			        drilldown: {
			            series: patientsArray/*[{
			                
			                id: '1001234561',
			                data: [{
			                name: '31',//recordID
			                y: 56,//no_of_days in hospital
			                age: '20-29',
			                sex: 'Male',
			                national_provider_id: '1001234561',
			                color:'#90ed7d'
			                
			                
			           		 },{
			                name: '31',//recordID
			                y: 32,//no_of_days in hospital
			                age: '20-29',
			                sex: 'Male',
			                national_provider_id: '1001234561',
			                color:'#f45b5b'
			                
			                
			           		 }
			                    
			                ]
			            }]*/
			        }
			    };
			 $('#DeathBasedonSymptom').highcharts(options);
			 
			 $('body').on('click', '.highcharts-button tspan', function() {
		        	/*chart.series[0].update({
	                tooltip:{
	                    xDateFormat: '%Y/%m/%d',
	                }
	            });  */
	        	alert("clicked")
		        });
			
		});
	});
	
	$("#filter_btn").click(function(){
		var chart = $('#DeathBasedonSymptom').highcharts();
		debugger;
	});
	
	$("#AgevsPersonsbasedonSymptom_btn").click(function(){
		$("#AgevsPersonsbasedonSymptom").show();
		var symptomvalue = $("#AgevsPersonsbasedonSymptom_input_Symptom").val();
		if(symptomvalue=="")
			{
			alert("Input Symptom");
			return;
			}
		$.get(url+"/cgi_query_3.php",{"symptom":symptomvalue},function(data,status){
			
			if(data=="0 results")
				{
				alert("Invalid Input OR "+data);
				return;
				}
			var jsondata = JSON.parse(data);
			var ageArray=["10-19","20-29","30-39","40-49","50-59","60-69","70-79","80-89","90-99"];
			var menCountArray=[];
			var womenCountArray=[];
			
			for(i=0;i<jsondata.length;i=i+1)
				{
				var obj = jsondata[i];
				if(obj.Sex=="1"){
					menCountArray.push(obj.count*(-1));
					
				}
				if(obj.Sex=="2"){
					womenCountArray.push(obj.count*1);
					
				}
				
				
				}
			
			 $('#AgevsPersonsbasedonSymptom').highcharts({
		            chart: {
		                type: 'bar'
		            },
		            title: {
		                text: 'Patient Count Based On Sex For Symptom - '+symptomvalue
		            },
		            subtitle: {
		                text: 'Hover on the Particular bar to know in Detail'
		            },
		            xAxis: [{
		                categories: ageArray,
		                reversed: false,
		                labels: {
		                    step: 1
		                }
		            }, { // mirror axis on right side
		                opposite: true,
		                reversed: false,
		                categories: ageArray,
		                linkedTo: 0,
		                labels: {
		                    step: 1
		                }
		            }],
		            yAxis: {
		                title: {
		                    text: null
		                },
		                labels: {
		                    formatter: function () {
		                        return Math.abs(this.value) + '';
		                    }
		                }
		            },

		            plotOptions: {
		                series: {
		                    stacking: 'normal'
		                }
		            },

		            tooltip: {
		                formatter: function () {
		                       return '<b>' + Highcharts.numberFormat(Math.abs(this.point.y), 0) +' '+this.series.name + ' Patients Between age ' + this.point.category + '</b>';
		                }
		            },

		            series: [{
		                name: 'Male',
		                data: menCountArray
		            }, {
		                name: 'Female',
		                data: womenCountArray
		            }]
		        });
			
		});
	});
	
	
	
	
	
});