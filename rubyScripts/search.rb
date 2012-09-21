#wtyczka szukająca substringa w plikach folderu w którym owy skrypt się otworzy
# zwraca tablicę stingów o postaci "NazwaPliku linijkaGdzieWystąpiłString"
require "rubygems"
def searchForString(string,wdirectory,sdirectory)
tab = []
_workdirectory = Dir.open(wdirectory)
_savedirectory = Dir.open(sdirectory)
_name = "searchResult_" + string + "_" + Time.now().to_i.to_s
Dir.chdir(_savedirectory)
_save = File.new(_name+".txt","w+")
Dir.chdir(_workdirectory)
_workdirectory.each do |file|
	if File.extname(file) == ".js"
_file = File.open(file,"r")
i=0

_file.each  {|line| i=i+1
	if line.include? string then
		 Dir.chdir(_savedirectory)
		_save.puts(_file.inspect.to_s + " "  + i.to_s) 
		tab << _file.inspect.to_s + " "  + i.to_s
		Dir.chdir(_workdirectory) 
		 end
	 }

end
end
puts tab
end
_savedir = File.expand_path("results")
_workdir = File.expand_path("..")
searchForString(ARGV[0],_workdir,_savedir)
 
