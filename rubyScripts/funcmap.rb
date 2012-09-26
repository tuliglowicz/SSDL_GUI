require "rubygems"
$_notfunctions = [nil,"prompt","if","while","switch","for", "return","}", "$","function","jQuery", "alert", "log", "a" ,"+" ,":", "&&", "\"","+=" ,"=", "||", "})", "}).bind" ,".attr",".dblclick","console.log"]
$_filesOmitted = ["language.js","SSDL_GUI.js","ontology.js","config.js"]
$_lineNumber = 0
def init(wdirectory,sdirectory)
	map = Hash.new()
$_workdirectory = Dir.open(wdirectory)
$_savedirectory = Dir.open(sdirectory)
_name = "function_map_result"  + "_" + Time.now().to_i.to_s
Dir.chdir $_savedirectory
$_save = File.new(_name+".txt","w+")
Dir.chdir($_workdirectory)
$_workdirectory.each do |file|
	filey = File.basename(file)
	if ((File.extname(file) == ".js") && (!$_filesOmitted.include?(filey)))
_file = File.open(file,"r")
Dir.chdir $_savedirectory
$_save.puts("-------------------------Beginning of " + _file.inspect.to_s+" -------------------------")
Dir.chdir($_workdirectory)
$_lineNumber = 0
searchfunc(0,_file)
Dir.chdir $_savedirectory
$_save.puts("-------------------------End of " + _file.inspect.to_s+" -------------------------\n\n")
Dir.chdir($_workdirectory)
end
end
puts "Mission Accomplished, see the result data @ " + _name + ".txt"
end

def searchfunc(i, file)
	stopCounter = 1
	stop = false
	addedFunctionCalls = []
	while (!stop && (line = file.readline)  )
			$_lineNumber += 1
		line=line.split("//")[0]
	if ((line.include? "function ") && (!line.include? "function(")  && (!line.include? "function (") && !stop) then
		linetab = line.split
		index = (linetab.index("function") || linetab.index("(function"))  +1
		name  = linetab[index].split("(")[0]
		Dir.chdir $_savedirectory
		$_save.puts("\t"*i+name+ " " + $_lineNumber.to_s)	
		Dir.chdir($_workdirectory)
		if(!line.include? ("{}"))
		searchfunc(i+1,file)
	end
		else
			check = line.split("(")
		if ((check.length>1))
			checkforfunc = check[0].split.last
			if(! ($_notfunctions.include?(checkforfunc)))
				splitForDots = checkforfunc.split(".")
				if splitForDots.length >1
					allowtosave = true
					splitForDots.each do |part|
						if($_notfunctions.include?(part))
							allowtosave = false
						end
					end
					if allowtosave
					if (!addedFunctionCalls.include?(checkforfunc))
					Dir.chdir $_savedirectory
					$_save.puts("\t"*(i+1)+"-> "+checkforfunc + " " + $_lineNumber.to_s)	
					addedFunctionCalls << checkforfunc
					Dir.chdir($_workdirectory)
				end
				end
				else
			if (!addedFunctionCalls.include?(checkforfunc))		
			Dir.chdir $_savedirectory
			$_save.puts("\t"*(i+1)+"-> "+checkforfunc + " " + $_lineNumber.to_s)	
			addedFunctionCalls << checkforfunc
			Dir.chdir($_workdirectory)
		end
		end
			end
	
		end
	if (line.include? "{")  then
		count = line.scan(/{/).length 
		stopCounter += count
	end
	if  (line.include? "}") then
		count = line.scan(/}/).length
		stopCounter -=count
	end	
	if (stopCounter ==0) then
		stop =true
	end
	end
end
	rescue EOFError
    file.close

end
_savedir = File.expand_path("results")
_workdir = File.expand_path("..")
init(_workdir,_savedir)

