#wtyczka szukająca substringa w plikach folderu w którym owy skrypt się otworzy
# zwraca tablicę stingu o postaci "NazwaPliku linijkaGdzieWystąpiłString"
require "rubygems"
def searchForString(string,directory)
tab = []
_directory = Dir.open(directory)
_directory.each do |file|
	if File.file? (file)
_file = File.open(file, "r")
i=0
_file.each  {|line| i=i+1 
	if line.include? string then tab << _file.inspect.to_s + " "  + i.to_s end\
	 }

end
end

return tab
end

puts searchForString("JACKU_TUTAJ",Dir.pwd)
