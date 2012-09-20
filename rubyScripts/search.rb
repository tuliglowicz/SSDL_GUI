#wtyczka szukająca substringa w plikach folderu w którym owy skrypt się otworzy
# zwraca tablicę stingów o postaci "NazwaPliku linijkaGdzieWystąpiłString"
require "rubygems"
def searchForString(string,directory)
tab = []
_directory = Dir.open(directory)
Dir.chdir(directory)
puts _directory.inspect
_directory.each do |file|
	if File.extname(file) == ".js"
_file = File.open(file,"r")
i=0

_file.each  {|line| i=i+1
	if line.include? string then tab << _file.inspect.to_s + " "  + i.to_s end
	 }

end
end

puts tab
end

searchForString(ARGV[0],File.expand_path(".."))
